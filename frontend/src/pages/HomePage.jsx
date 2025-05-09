import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";  // Для переходов между страницами

function HomePage() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="text-center">
        <h2 className="mb-4" style={{ fontSize: "2rem", color: "#343a40" }}>
          Выберите таблицу
        </h2>
        <ButtonGroup vertical>
          <Link to="/residents" className="mb-3">
            <Button variant="primary" size="lg" style={{ width: "250px" }}>
              Проживающие
            </Button>
          </Link>
          <Link to="/rooms" className="mb-3">
            <Button variant="secondary" size="lg" style={{ width: "250px" }}>
              Комнаты
            </Button>
          </Link>
          <Link to="/passports" className="mb-3">
            <Button variant="success" size="lg" style={{ width: "250px" }}>
              Паспорта
            </Button>
          </Link>
          <Link to="/addresses" className="mb-3">
            <Button variant="warning" size="lg" style={{ width: "250px" }}>
              Адреса
            </Button>
          </Link>
          <Link to="/parents" className="mb-3">
            <Button variant="danger" size="lg" style={{ width: "250px" }}>
              Родители
            </Button>
          </Link>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default HomePage;
