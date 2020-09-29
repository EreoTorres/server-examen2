var express = require('express');
var router = express.Router({ mergeParams: true });
var prospectosModel =  require('../Models/prospectos-Model.js');

router.post('/getProspectos',function(req, res, next) {
    prospectosModel.getProspectos(req.body.filtro).then(function(results) {
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

router.post('/setProspecto',async function(req, res, next) {
    prospectosModel.setProspecto(req.body.prospecto).then(function(results) {
        if(!fs.existsSync('./public/docs/'+results.insertId)){
            fs.mkdir('./public/docs/'+results.insertId, {recursive: true}, err => {});
        }

        for(let datos of req.body.documentos){
            prospectosModel.saveFile(datos,results.insertId);
        }

        res.setHeader("Content-Type", "application/json");
        res.json({codigo: 200,resultado: results});
        res.end();    
    }).catch((err) => setImmediate(() => { throw err; }));
});

router.get('/showdoc/:idprospecto/:nombredoc', function(req, res, next) {
    const filePath = './public/docs/'+req.params.idprospecto+'/'+req.params.nombredoc+'.png'

    fs.readFile(filePath, function(err, data) {
      if (err){
        throw err;
      }else{
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(data); // Send the file data to the browser.
      }
    });
});

module.exports = router;
