// src/pages/Passports.js
import React, { useState, useEffect } from "react";
import { fetchPassports } from "../api/api";

function Passports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchPassports();
        setData(result);
      } catch (error) {
        console.error("Ошибка при загрузке данных о паспортах:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>Паспорта</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>№</th>
            <th>ФИО проживающего</th>
            <th>Серия</th>
            <th>Номер</th>
            <th>Кем выдан</th>
            <th>Дата выдачи</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.resident}</td>
              <td>{p.resident_fio}</td>
              <td>{p.series}</td>
              <td>{p.number}</td>
              <td>{p.issued_by}</td>
              <td>{p.issue_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Passports;
