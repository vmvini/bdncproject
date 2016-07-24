var express = require('express');
var router = express.Router();
var auth = require('../authMiddleware/authMiddleware').auth;

var reportsCtrl = require('../controllers/reportsCtrl');

//buscar denuncias por campo de visão do mapa
router.post('/getreports', reportsCtrl.getReports );

//registrar denuncia
router.post('/reports', auth, reportsCtrl.newReport );

//atualizar denuncia
router.put('/reports/:reportid/:newReport', auth,  reportsCtrl.updateReport );

//remover denuncia
/*router.delete('/reports/:reportid', reportsCtrl.deleteReport );*/


module.exports = router;