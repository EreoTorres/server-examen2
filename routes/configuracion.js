var express = require('express');
var router = express.Router({ mergeParams: true });
var configModel =  require('../Models/configuracion-Model.js');

router.post('/getConfiguracion',function(req, res, next) {
    configModel.getConfiguracion().then(function(results) {
        if(results){
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,resultado: results});
            res.end();    
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 0,mensaje: "No se encontro la configuración"});
            res.end(); 
        }
    }).catch((err) => console.log(err));
});

router.post('/setConfiguracion',async function(req, res, next) {
    configModel.setConfiguracion(req.body).then(function(results) {
        if(results){
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,mensaje: "Bien Hecho. La configuracion ha sido registrado correctamente"});
            res.end(); 
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,mensaje: 'Problemas al registrar'});
            res.end(); 
        }
    }).catch((err) => console.log(err));
});

module.exports = router;