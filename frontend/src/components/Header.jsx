// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-light shadow-sm mb-4 p-3 d-flex justify-content-between align-items-center">
      <h4 className="mb-0">Привет, Админ!</h4>
      <button className="btn btn-danger" onClick={handleLogout}>
        Выйти
      </button>
    </header>
  );
};

export default Header;
