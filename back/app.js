require('dotenv').config();
const Server = require('./models/server');
//require('dotenv').config('.models/server');
//creo insatancia de lo que exporte//
//traiga en una variable el export de server//

const server = new Server();
//instancio el servido//

server.listen();
// debe salir canon get quiere decir que la
//la pagina si existe pero no hay nada creado 