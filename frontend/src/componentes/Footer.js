import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
     <footer className="text-center text-lg-start bg-light text-muted">
     <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
       <div className="me-5 d-none d-lg-block">
         <span>Conéctate con nosotros en redes sociales:</span>
       </div>
       <div>   
         <a href="#" className="me-4 text-reset">
           <FaFacebook />
         </a>
         <a href="#" className="me-4 text-reset">
           <FaTwitter />
         </a>
         <a href="#" className="me-4 text-reset">
           <FaInstagram />
         </a>
       </div>
     </section>
     <section className="p-12 pt-0">
       <div className="container text-center text-md-start">
         <div className="row">
           <div className="col-md-12 col-lg-12 col-xl-11 mx-auto mb-10">
             <span> <b>APLICACION PRODUCTOS, </b>
                Esta aplicación es un sistema de gestión de VENTA DE PRODUCTOS
               permite crear, editar y eliminar registros de PRODUCTOS de una
               manera sencilla. 
             </span>
           </div>
         </div>
       </div>
     </section>
     <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        contactos &copy; {new Date().getFullYear()}
        <br></br>
        <b>@nathalia-palacios</b>
      </div>
   </footer>
  );
};

export default Footer;
