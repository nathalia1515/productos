const express = require('express')
const bodyParser = require('body-parser');

const cors = require('cors');


class Server{

    constructor(){ 
// el metodo constructor es el que contrulle la clase 
// y el primero que se ejecuta 
        this.app=express(); // atributos
        this.port = 3200;
        this.middlewares();
        this.routes(); // llamo el metodo para poder mostrarlo en pantalla
 

    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }


    listen(){//para que funcioene el puerto
       this.app.listen(this.port, () => {
            console.log(`servidor corriendo por el puerto ${this.port}`)
          })
    }
    routes(){
        this.app.use('/Personas', require('../routes/persons.routes'));
        this.app.use('/Productos',require('../routes/Producto.routes'));
        this.app.use('/Categoria',require('../routes/Categoria.routes'));
        this.app.use('/Users', require('../routes/Users.routes'));
    }
}
module.exports = Server;
//exportola clase Server //