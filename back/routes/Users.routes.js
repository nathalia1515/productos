const {Router} = require('express');
const { validateJwt } = require('../middlewares/validar_jwt')
//const { addUser, ShowUSers, UpdateUser, DeleteUser, ShowUSer, Login} = require('../controllers/users.controller');

const router = Router();

router.get('/', ShowUSers);
router.post('/', addUser);
router.post('/login', Login);
router.put('/:id', UpdateUser);
router.delete('/:id', DeleteUser);
router.get('/:id', validateJwt, ShowUSer);

module.exports = router;