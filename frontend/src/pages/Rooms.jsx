// // src/pages/Rooms.js
// import React, { useState, useEffect } from "react";
// import { fetchRooms } from "../api/api";

// function Rooms() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const result = await fetchRooms();
//         setData(result);
//       } catch (error) {
//         console.error("Ошибка при загрузке данных о комнатах:", error);
//       }
//     };

//     loadData();
//   }, []);

//   return (
//     <div>
//       <h2>Комнаты</h2>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Номер</th>
//             <th>Этаж</th>
//             <th>Вместимость</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((r) => (
//             <tr key={r.id}>
//               <td>{r.number}</td>
//               <td>{r.floor}</td>
//               <td>{r.capacity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Rooms;


import React, { useState, useEffect } from "react";
import { fetchRooms, addRoom, updateRoom, deleteRoom } from "../api/api";
import {
  Button,
  Table,
  Container,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

function Rooms() {
  const [data, setData] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomNumber, setRoomNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await fetchRooms();
      setData(result);
    } catch (error) {
      console.error("Ошибка при загрузке данных о комнатах:", error);
    }
  };

  const handleAdd = async () => {
    const newRoom = { number: roomNumber, floor, capacity };
    try {
      const result = await addRoom(newRoom);
      setData((prev) => [...prev, result]);
      resetForm();
      setShowModalAdd(false);
    } catch (error) {
      console.error("Ошибка при добавлении комнаты:", error);
    }
  };

  const handleEdit = async () => {
    const updatedRoom = { ...selectedRoom, number: roomNumber, floor, capacity };
    try {
      const result = await updateRoom(updatedRoom.id, updatedRoom);
      setData((prev) =>
        prev.map((room) => (room.id === result.id ? result : room))
      );
      resetForm();
      setShowModalEdit(false);
    } catch (error) {
      console.error("Ошибка при обновлении комнаты:", error);
    }
  };

  const handleDeleteSingle = async (room) => {
    if (room.residents.length > 0) {
      setShowWarning(true);
      return;
    }
    try {
      await deleteRoom(room.id);
      setData((prev) => prev.filter((r) => r.id !== room.id));
    } catch (error) {
      console.error("Ошибка при удалении комнаты:", error);
    }
  };

  const handleMassDelete = async () => {
    const roomsToDelete = selectedRooms.filter(
      (id) => data.find((room) => room.id === id).residents.length === 0
    );
    if (roomsToDelete.length !== selectedRooms.length) {
      setAlert(
        "Некоторые выбранные комнаты содержат проживающих. Сначала переселите людей в другие комнаты."
      );
      return;
    }
    try {
      await Promise.all(roomsToDelete.map((id) => deleteRoom(id)));
      setData((prev) => prev.filter((room) => !selectedRooms.includes(room.id)));
      setSelectedRooms([]);
    } catch (error) {
      console.error("Ошибка при массовом удалении:", error);
    }
  };

  const resetForm = () => {
    setRoomNumber("");
    setFloor("");
    setCapacity("");
    setSelectedRoom(null);
  };

  const openEditModal = (room) => {
    setSelectedRoom(room);
    setRoomNumber(room.number);
    setFloor(room.floor);
    setCapacity(room.capacity);
    setShowModalEdit(true);
  };

  const toggleSelectRoom = (id) => {
    setSelectedRooms((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <Container className="mt-4">
      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => navigate("/home")}
      >
        На главную
      </Button>

      <div className="d-flex justify-content-center mb-3">
        <Button variant="primary" onClick={() => setShowModalAdd(true)}>
          <FaPlus className="me-2" />
          Добавить комнату
        </Button>
      </div>

      {alert && (
        <Alert
          variant="warning"
          onClose={() => setAlert("")}
          dismissible
        >
          {alert}
        </Alert>
      )}

      <Button
        variant="danger"
        className="mb-3"
        onClick={handleMassDelete}
        disabled={selectedRooms.length === 0}
      >
        <FaTrash className="me-2" />
        Удалить выбранные
      </Button>

      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th></th>
            <th>Номер</th>
            <th>Этаж</th>
            <th>Вместимость</th>
            <th>Занято</th>
            <th>Свободно</th>
            <th>Проживающие</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.map((room) => (
            <tr key={room.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedRooms.includes(room.id)}
                  onChange={() => toggleSelectRoom(room.id)}
                  disabled={room.residents.length > 0}
                />
              </td>
              <td>{room.number}</td>
              <td>{room.floor}</td>
              <td>{room.capacity}</td>
              <td>{room.occupied_places}</td>
              <td>{room.free_places}</td>
              <td>
                {room.residents.length > 0 ? (
                  <ul className="mb-0">
                    {room.residents.map((res) => (
                      <li key={res.id}>
                        {res.last_name} {res.first_name} {res.middle_name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>Нет проживающих</span>
                )}
              </td>
              <td>
                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => openEditModal(room)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteSingle(room)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding room */}
      <Modal show={showModalAdd} onHide={() => setShowModalAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить комнату</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="roomNumber" className="mb-3">
              <Form.Label>Номер комнаты</Form.Label>
              <Form.Control
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="floor" className="mb-3">
              <Form.Label>Этаж</Form.Label>
              <Form.Control
                type="number"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="capacity" className="mb-3">
              <Form.Label>Вместимость</Form.Label>
              <Form.Control
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalAdd(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing room */}
      <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать комнату</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editRoomNumber" className="mb-3">
              <Form.Label>Номер комнаты</Form.Label>
              <Form.Control
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="editFloor" className="mb-3">
              <Form.Label>Этаж</Form.Label>
              <Form.Control
                type="number"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="editCapacity" className="mb-3">
              <Form.Label>Вместимость</Form.Label>
              <Form.Control
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalEdit(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Warning Modal */}
      <Modal show={showWarning} onHide={() => setShowWarning(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Внимание</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ⚠ Сначала переселите людей в другие комнаты перед удалением.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowWarning(false)}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Rooms;







