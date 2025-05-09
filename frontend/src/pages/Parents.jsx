// src/pages/Parents.js
import React, { useState, useEffect } from "react";
import { fetchParents } from "../api/api";

function Parents() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchParents();
        setData(result);
      } catch (error) {
        console.error("Ошибка при загрузке данных о родителях:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>Родители</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Проживающий</th>
            <th>ФИО родителя</th>
            <th>Телефон</th>
            <th>Серия паспорта</th>
            <th>Номер паспорта</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.resident}</td>
              <td>{p.full_name}</td>
              <td>{p.phone}</td>
              <td>{p.passport_series}</td>
              <td>{p.passport_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Parents;
