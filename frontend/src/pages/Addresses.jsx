// src/pages/Addresses.js
import React, { useState, useEffect } from "react";
import { fetchAddresses } from "../api/api";

function Addresses() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchAddresses();
        setData(result);
      } catch (error) {
        console.error("Ошибка при загрузке данных о адресах:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>Адреса</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Проживающий</th>
            <th>Город</th>
            <th>Улица</th>
            <th>Дом</th>
            <th>Корпус</th>
            <th>Квартира</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => (
            <tr key={a.id}>
              <td>{a.resident}</td>
              <td>{a.city}</td>
              <td>{a.street}</td>
              <td>{a.house}</td>
              <td>{a.building}</td>
              <td>{a.apartment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Addresses;
