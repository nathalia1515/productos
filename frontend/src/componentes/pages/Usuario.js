import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function Usuario() {
  const [Usuarios, setUsuarios] = useState([]);
  const [cedula, setcedula] = useState('');
  const [nombre, setnombre] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [UsuarioToDelete, setUsuarioToDelete] = useState(null);
  const [UsuarioId, setUsuarioId] = useState(null); // Nuevo estado para almacenar el ID del Usuario a editar
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    cargarUsuarios();
  }, []);

  function handleModalOpen(id) {
    if (id) {
      const Usuario = Usuarios.find((g) => g.id === id);
      if (Usuario) {
        setcedula(Usuario.cedula);
        setnombre(Usuario.nombre);
        setUsuarioId(id);
        setShowModal(true);
      }
    } else {
      resetForm();
      setShowModal(true);
    }
  }

  function handleModalClose() {
    setShowModal(false);
  }

  function handleCancelar() {
    resetForm();
    setShowModal(false);
  }

  const cargarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3200/Personas');
      setUsuarios(response.data);
      console.log('ooooooo',response);
    } catch (error) {
      console.error(error);
    }
  };

  const buscarUsuarios = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3200/Personas/?search=${query}`);
      setUsuarios(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    try {
      const nuevoUsuario = {
        cedula:cedula,
        nombre:nombre,
      };
      
      await axios.post('http://localhost:3200/Personas', nuevoUsuario);
      cargarUsuarios();
      resetForm();
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };


 

  const editarUsuario = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      const UsuarioModificado = {
        cedula:cedula,
        nombre:nombre,
      };
      console.log(UsuarioModificado)
      await axios.put(`http://localhost:3200/Personas/${UsuarioId}`, UsuarioModificado);
      cargarUsuarios();
      resetForm();
      handleModalClose();
    } catch (error) {
      console.error("error de conexion",error);
    }
  };

  const eliminarUsuario = (Usuario) => {
    setUsuarioToDelete(Usuario);
    setShowDeleteModal(true);
  };

  const handleEliminarConfirmado = async (id) => {
    try {
      await axios.delete(`http://localhost:3200/Personas/${id}`);
      cargarUsuarios();
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  const resetForm = () => {
        setcedula('');
        setnombre('');
        setUsuarioId(null);
  };

  return (
    <div className="container">
      <div className="container">
        <h1 className="mt-4 text-center h2">LISTA DE USUARIOS</h1> <br />
        
        <button
  type="button"
  className="btn btn-success"
  onClick={() => {
    handleModalOpen();
    setUsuarioId(null);
  }}
>
  Crear la usuario
</button>
        <br></br><br></br><br></br>
         <form className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar Usuario"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => buscarUsuarios(searchQuery)}
              >
                Buscar
              </button>
            </div>
          </div>
        </form>
 
        <br></br><br></br>

        <table className="table table-responsive-sm table-striped table-bordered">
  <thead className="thead-dark">
    <tr>
      <th>Indentifiación</th>
      <th>Nombres</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {Usuarios.map((Usuario) => (
      <tr key={Usuario.id}>
        <td>{Usuario.cedula}</td>
        <td>{Usuario.nombre}</td>
        <td>
          <div className="d-flex flex-column flex-sm-row">
            <button className="btn btn-primary mb-2 mb-sm-0 mr-sm-2" onClick={() => handleModalOpen(Usuario.id)}>Editar</button>
            <button className="btn btn-danger" onClick={() => eliminarUsuario(Usuario)}>Eliminar</button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {UsuarioId ? 'Editar usuario' : 'Crear usuario'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={UsuarioId ? editarUsuario : crearUsuario}>
          
            
            
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="cedula"
                value={cedula}
                onChange={(e) => setcedula(e.target.value)}
                required
              />
            </div>
           
            
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombres"
                value={nombre}
                onChange={(e) => setnombre(e.target.value)}
                required
              />
            </div>
            
           
            <Button variant="secondary" onClick={handleCancelar}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </form>
        </Modal.Body>
      </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar cedula</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar la cedula?</p>
          <p>Nombre: {UsuarioToDelete?.nombre}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleEliminarConfirmado(UsuarioToDelete?.id)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>


     
    </div>
  );
}

export default Usuario;
