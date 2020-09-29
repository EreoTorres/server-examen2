var express = require('express');
var router = express.Router({ mergeParams: true });
var estatusModel =  require('../Models/estatus-Model.js');

router.post('/getEstatus',function(req, res, next) {
    estatusModel.getEstatus().then(function(results) {
        if(results.length > 0){
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 200,resultado: results});
            res.end();    
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 0,mensaje: "No se encontraron prospectos"});
            res.end(); 
        }
    }).catch((err) => setImmediate(() => { throw err; }));
});

module.exports = router;
