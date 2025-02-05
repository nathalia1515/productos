import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaCentos, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

import Inicio from './pages/Inicio';
import Login from './pages/login';  // Agrega la importación del componente Login
import logo from '../logo.png';
import Footer from './Footer';
//import Categoria from './pages/Categoria';
import Usuario from './pages/Usuario';
import Producto from './pages/Producto';
import Categoria from './pages/Categorias';

const Menu = () => {
  return (
    <Router>
      <header>
        <br />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container d-flex justify-content-end">
            
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <FaHome /> INICIO
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Categoria">
                    <FaCentos /> Categorias
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Producto">
                    <FaCentos /> Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Usuario">
                    <FaCentos /> Usuarios
                  </Link>
                </li>
                
                
                <li className="nav-item">
                  <Link className="nav-link" to="/salir">
                    <FaSignOutAlt /> SALIR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Categoria" element={<Categoria />} />
        <Route path="/Producto" element={<Producto />} />
        <Route path="/Usuario" element={<Usuario />} />
        <Route path="/salir" element={<Login onLogin={() => {}} />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default Menu;
