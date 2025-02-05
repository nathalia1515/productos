import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function Categoria() {

  const [Categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [CategoriaToDelete, setCategoriaToDelete] = useState(null);
  const [CategoriaId, setCategoriaId] = useState(null); // Nuevo estado para almacenar el ID del Categoria a editar
  const [searchQuery, setSearchQuery] = useState('');



  

  useEffect(() => {
    cargarCategorias();
  }, []);

  function handleModalOpen(id) {
    if (id) {
      const Categoria = Categorias.find((g) => g.id === id);
      console.log(Categoria);
      if (Categoria) {
        setNombre(Categoria.nombre);
        setDescripcion(Categoria.descripcion);
        
      

        setCategoriaId(id);
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

  const cargarCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:3200/Categoria');
      setCategorias(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const buscarCategorias = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3200/Categoria/?search=${query}`);
      setCategorias(response.data);
    } catch (error) {
      console.error(error);
    }
  };
//petodo para hacer inser
  const crearCategoria = async (e) => {
    console.log('golllccc',crearCategoria);
    e.preventDefault();
    try {
      const nuevoCategoria = {
       
        nombre:nombre,
        descripcion:descripcion,
        
        
      };
      
      await axios.post('http://localhost:3200/Categoria', nuevoCategoria);
      cargarCategorias();
      resetForm();
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };


 

  const editarCategoria = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      const CategoriaModificado = {
        nombre:nombre,
        descripcion:descripcion,
       
      };
     
      await axios.put(`http://localhost:3200/Categoria/${CategoriaId}`, CategoriaModificado);
      cargarCategorias();
      resetForm();
      handleModalClose();
    } catch (error) {
      console.error("error de conexion",error);
    }
  };

  const eliminarCategoria = (Categoria) => {
    setCategoriaToDelete(Categoria);
    setShowDeleteModal(true);
  };

  const handleEliminarConfirmado = async (id) => {
    try {
      await axios.delete(`http://localhost:3200/Categoria/${id}`);
      cargarCategorias();
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  const resetForm = () => {
        setNombre('');
        setDescripcion('');
       
    

    setCategoriaId(null);
  };

  return (
    <div className="container">
      <div className="container">
        <h1 className="mt-4 text-center h2">Gestión de Categorias</h1> <br />
        
        <button
  type="button"
  className="btn btn-success"
  onClick={() => {
    handleModalOpen();
    setCategoriaId(null);
  }}
>
  Crear la Categoria
</button>
        <br></br><br></br><br></br>
         <form className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar Categoria"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => buscarCategorias(searchQuery)}
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
      <th>Categoria</th>
      <th>Descripcion</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {Categorias.map((Categoria) => (
      <tr key={Categoria.id}>
        <td>{Categoria.nombre}</td>
        <td>{Categoria.descripcion}</td>
        <td>
          <div className="d-flex flex-column flex-sm-row">
            <button className="btn btn-primary mb-2 mb-sm-0 mr-sm-2" onClick={() => handleModalOpen(Categoria.id)}>Editar</button>
            <button className="btn btn-danger" onClick={() => eliminarCategoria(Categoria)}>Eliminar</button>
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
            {CategoriaId ? 'Editar el Categoria' : 'Crear Categoria'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={CategoriaId ? editarCategoria : crearCategoria}>
          
            
            
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Categoria"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
           
            
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
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
          <Modal.Title>Eliminar la Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar la Categoria?</p>
          <p>Nombre: {CategoriaToDelete?.nombre}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleEliminarConfirmado(CategoriaToDelete?.id)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>


     
    </div>
  );
}

export default Categoria;
