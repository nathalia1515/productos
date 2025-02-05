//las rutas es por donde sale la infromacion son las url o intrepoits
const {Router}= require('express');

// debo importar los emtodos 

// con eso hago visualizar 
const{ShowProducto,addProductos,UpdateProductos,DeleteProductos,ShowProductos}=require('../controllers/productos.controller')
const router = Router();
router.get('/',ShowProductos);
router.post('/',addProductos);
router.put('/:id',UpdateProductos); // esto va por la cabesera
router.delete('/:id',DeleteProductos);
router.get('/:id',ShowProducto);


module.exports= router;
