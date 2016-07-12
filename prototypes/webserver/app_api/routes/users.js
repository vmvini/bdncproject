var express = require('express');
var router = express.Router();

var usersCtrl = require('../controllers/')

//retornar usuario pelo seu id
router.get('/users/:userid', );

//cadastrar novo usuario
router.post('/users', );

//atualizar usuario
router.put('/users/:userid', );

//remover usuario
router.delete('/users/:userid', );


module.exports = router;