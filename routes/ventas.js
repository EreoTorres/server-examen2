var express = require('express');
var router = express.Router({ mergeParams: true });
var ventasModel =  require('../Models/ventas-Model.js');
var moment = require('moment');

router.post('/getVentas',function(req, res, next) {
    ventasModel.getVentas().then(function(results) {
        if(results){
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,resultado: results});
            res.end();    
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 0,mensaje: "No se encontraron clientes"});
            res.end(); 
        }
    }).catch((err) => console.log(err));
});

router.post('/setVentas',async function(req, res, next) {
    ventasModel.setVentas(req.body).then(function(results) {
        if(results){
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,mensaje: "Bien Hecho. La venta ha sido registrada correctamente"});
            res.end(); 
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,mensaje: 'Problemas al registrar'});
            res.end(); 
        }
    }).catch((err) => console.log(err));
});

module.exports = router;