//las rutas es por donde sale la infromacion son las url o intrepoits
const {Router}= require('express');
const { ShowCategorias, addCategoria, UpdateCategoria, DeleteCategoria } = require('../controllers/Categoria.controller');

// debo importar los emtodos 

const router = Router();
router.get('/',ShowCategorias);
router.post('/',addCategoria);
router.put('/:id',UpdateCategoria); // esto va por la cabesera
router.delete('/:id',DeleteCategoria);


module.exports= router;
