import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function Producto() {

  const [Productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [valor, setValor] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ProductoToDelete, setProductoToDelete] = useState(null);
  const [ProductoId, setProductoId] = useState(null); // Nuevo estado para almacenar el ID del Producto a editar
  const [searchQuery, setSearchQuery] = useState('');



  

  useEffect(() => {
    cargarProductos();
  }, []);

  function handleModalOpen(id) {
    if (id) {
      const Producto = Productos.find((g) => g.id === id);
      console.log(Producto);
      if (Producto) {
        setNombre(Producto.nombre);
        setCantidad(Producto.cantidad);
        setValor(Producto.valor);
      

        setProductoId(id);
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

  const cargarProductos = async () => {
    try {
      const response = await axios.get('http://localhost:3200/Productos');
      setProductos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const buscarProductos = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3200/Productos/?search=${query}`);
      setProductos(response.data);
    } catch (error) {
      console.error(error);
    }
  };
//petodo para hacer inser
  const crearProducto = async (e) => {
    e.preventDefault();
    try {
      const nuevoProducto = {
       
        nombre:nombre,
        cantidad:Number(cantidad),
        valor:Number(valor),
        
      };
      
      await axios.post('http://localhost:3200/Productos', nuevoProducto);
      cargarProductos();
      resetForm();
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };


 

  const editarProducto = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      const ProductoModificado = {
        nombre:nombre,
        cantidad:Number(cantidad),
        valor:Number(valor),
       
      };
     
      await axios.put(`http://localhost:3200/Productos/${ProductoId}`, ProductoModificado);
      cargarProductos();
      resetForm();
      handleModalClose();
    } catch (error) {
      console.error("error de conexion",error);
    }
  };

  const eliminarProducto = (Producto) => {
    setProductoToDelete(Producto);
    setShowDeleteModal(true);
  };

  const handleEliminarConfirmado = async (id) => {
    try {
      await axios.delete(`http://localhost:3200/Productos/${id}`);
      cargarProductos();
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  const resetForm = () => {
        setNombre('');
        setCantidad('');
        setValor('');
    

    setProductoId(null);
  };

  return (
    <div className="container">
      <div className="container">
        <h1 className="mt-4 text-center h2">Gestión de productos</h1> <br />
        
        <button
  type="button"
  className="btn btn-success"
  onClick={() => {
    handleModalOpen();
    setProductoId(null);
  }}
>
  Crear la producto
</button>
        <br></br><br></br><br></br>
         <form className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar Producto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => buscarProductos(searchQuery)}
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
      <th>Producto</th>
      <th>Cantidad</th>
      <th>valor</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {Productos.map((Producto) => (
      <tr key={Producto.id}>
        <td>{Producto.nombre}</td>
        <td>{Producto.cantidad}</td>
        <td>{Producto.valor}</td>
        <td>
          <div className="d-flex flex-column flex-sm-row">
            <button className="btn btn-primary mb-2 mb-sm-0 mr-sm-2" onClick={() => handleModalOpen(Producto.id)}>Editar</button>
            <button className="btn btn-danger" onClick={() => eliminarProducto(Producto)}>Eliminar</button>
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
            {ProductoId ? 'Editar el producto' : 'Crear producto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ProductoId ? editarProducto : crearProducto}>
          
            
            
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
           
            
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
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
          <Modal.Title>Eliminar la producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar la producto?</p>
          <p>Nombre: {ProductoToDelete?.nombre}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleEliminarConfirmado(ProductoToDelete?.id)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>


     
    </div>
  );
}

export default Producto;
