var express = require('express');
var router = express.Router({ mergeParams: true });
var cuponesModel =  require('../Models/cupones-Model.js');

router.post('/getCupones',function(req, res, next) {
    cuponesModel.getCupones().then(function(results) {
        if(results){
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,resultado: results});
            res.end();    
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 0,mensaje: "No se encontraron cupones"});
            res.end(); 
        }
    }).catch((err) => console.log(err));
});

router.post('/searchCupones',function(req, res, next) {
    cuponesModel.searchCupon(req.body.cupon).then(function(results) {
        if(results.length > 0){
            for(let datos of results){
                if(datos.usado == 1){
                    res.setHeader("Content-Type", "application/json");
                    res.json({codigo: 0,mensaje: "El cupon ya fue utilizado"});
                    res.end(); 
                }else{
                    res.setHeader("Content-Type", "application/json");
                    res.json({codigo: 200,resultado: results});
                    res.end();    
                }
            }
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 0,mensaje: "No se encontro el cupon"});
            res.end(); 
        }
    }).catch((err) => console.log(err));
});

router.post('/setCupones',async function(req, res, next) {
    cuponesModel.setCupones(req.body).then(function(results) {
        if(results){
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,mensaje: "Bien Hecho. El cupon ha sido registrado correctamente"});
            res.end(); 
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,mensaje: 'Problemas al registrar'});
            res.end(); 
        }
    }).catch((err) => console.log(err));
});

module.exports = router;
