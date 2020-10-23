var express = require('express');
var router = express.Router({ mergeParams: true });
var articulosModel =  require('../Models/articulos-Model.js');

router.post('/getArticulos',function(req, res, next) {
    articulosModel.getArticulos().then(function(results) {
        if(results){
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,resultado: results});
            res.end();    
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 0,mensaje: "No se encontraron articulos"});
            res.end(); 
        }
    }).catch((err) => console.log(err));
});

router.post('/setArticulos',async function(req, res, next) {
    articulosModel.setArticulos(req.body).then(function(results) {
        if(results){
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,mensaje: "Bien Hecho. El articulo ha sido registrado correctamente"});
            res.end(); 
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,mensaje: 'Problemas al registrar'});
            res.end(); 
        }
    }).catch((err) => console.log(err));
});


module.exports = router;
