var express = require('express');
var router = express.Router();

var usersCtrl = require('../controllers/usersCtrl');

//retornar usuario pelo seu id
router.get('/users/:userid', usersCtrl.getUserById );

//cadastrar novo usuario
//router.post('/users', usersCtrl.createUser );

//atualizar usuario
//router.put('/users/:userid/:updateUser', usersCtrl.updateUser );

//remover usuario
//router.delete('/users/:userid', usersCtrl.removeUser );


module.exports = router;