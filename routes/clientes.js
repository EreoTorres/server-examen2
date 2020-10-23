var express = require('express');
var router = express.Router({ mergeParams: true });
var clientesModel =  require('../Models/clientes-Model.js');

router.post('/getClientes',function(req, res, next) {
    clientesModel.getClientes().then(function(results) {
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

router.post('/setClientes',async function(req, res, next) {
    clientesModel.setClientes(req.body).then(function(results) {
        if(results){
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,mensaje: "Bien Hecho. El cliente ha sido registrado correctamente"});
            res.end(); 
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,mensaje: 'Problemas al registrar'});
            res.end(); 
        }
    }).catch((err) => console.log(err));
});

module.exports = router;
