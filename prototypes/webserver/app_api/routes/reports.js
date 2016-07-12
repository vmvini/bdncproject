var express = require('express');
var router = express.Router();

var reportsCtrl = require('../controllers/reportsCtrl');

//buscar denuncias por campo de visão do mapa
router.get('/reports/lat/:lat/lng/:lng', reportsCtrl.getReports );

//registrar denuncia
router.post('/reports', reportsCtrl.newReport );

//atualizar denuncia
router.put('/reports/:reportid', reportsCtrl.updateReport );

//remover denuncia
router.delete('/reports/:reportid', reportsCtrl.deleteReport );


module.exports = router;