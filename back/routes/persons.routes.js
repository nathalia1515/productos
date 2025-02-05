//las rutas es por donde sale la infromacion son las url o intrepoits
const {Router}= require('express');

// debo importar los emtodos 

// con eso hago visualizar 
const{addPerson,ShowPersons,UpdatePerson,DeletePerson,ShowPerson, }=require('../controllers/persons.controller')
const router = Router();
router.get('/',ShowPersons);
router.post('/',addPerson);
router.put('/:id',UpdatePerson); // esto va por la cabesera
router.delete('/:id',DeletePerson);
router.get('/:id',ShowPerson);


module.exports= router;
