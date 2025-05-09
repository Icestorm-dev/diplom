// src/pages/Residents.js
import React, { useState, useEffect } from "react";
import { fetchResidents } from "../api/api";
import { Button, Table, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Residents() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchResidents();
        setData(result);
      } catch (error) {
        console.error("Ошибка при загрузке данных о проживающих:", error);
      }
    };

    loadData();
  }, []);

  return (
    <Container className="mt-4">
      <Button variant="secondary" className="mb-3" onClick={() => navigate("/home")}>
        На главную
      </Button>
      <h2 className="text-center mb-4">Проживающие</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Комната</th>
              <th>Институт</th>
              <th>Курс</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.id}>
                <td>{r.last_name}</td>
                <td>{r.first_name}</td>
                <td>{r.middle_name}</td>
                <td>{r.room.number || "-"}</td>
                <td>{r.institute}</td>
                <td>{r.course}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default Residents;
