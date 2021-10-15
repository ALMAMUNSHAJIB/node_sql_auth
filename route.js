const {createUser, getUsers, getUserById, update, deleteUser, login } = require('./controller');
const router = require('express').Router();
const {checkToken} = require('./auth/token_validations');


router.post('/',checkToken, createUser);
router.get('/',checkToken, getUsers);
router.get('/:id',checkToken, getUserById);
router.patch('/',checkToken, update);
router.delete('/',checkToken, deleteUser);
router.post('/login', login);


module.exports = router;