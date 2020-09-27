var express = require('express');
var router = express.Router({ mergeParams: true });

router.post('/', function(req, res, next) {});

router.post('/login',async function(req, res, next) {
    connectionapp.query('SELECT * FROM usuarios where usuario = ?',[req.body.usuario],async function (error, results, fields) {
        if (error){
            console.log("[mysql error]",error);
        }else if(results.length > 0){
            for(let dato of results){
                var result = await compareHash(dato.contra,req.body.contra);
                
                if(result){
                    result = await updateToken(dato.id,dato.contra);

                    if(result){
                        res.setHeader("Content-Type", "application/json");
                        res.json({codigo: 200,resultado: result});
                        res.end();      
                    } 
                }else{
                    res.setHeader("Content-Type", "application/json");
                    res.json({codigo: 400,mensaje: 'Contraseña incorrecta'});
                    res.end();       
                }
            }
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 400,mensaje: 'El usuario no existe'});
            res.end();             
        }
    });
});

router.post('/registro',async function(req, res, next) {
    connectionapp.query('SELECT * FROM usuarios where usuario = ?',[req.body.usuario],async function (error, results, fields) {
        if (error){
            console.log("[mysql error]",error);
        }else if(results.length > 0){
            res.setHeader("Content-Type", "application/json");
            res.json({codigo: 400,mensaje: 'El usuario ya existe'});
            res.end();    
        }else{
            var result = await registro(req.body);

            if(result){
                res.setHeader("Content-Type", "application/json");
                res.json({codigo: 200,resultado: result});
                res.end();   
            }else{
                res.setHeader("Content-Type", "application/json");
                res.json({codigo: 400,mensaje: 'Problemas en el registro'});
                res.end();  
            }
        }
    });
});

router.post('/update',async function(req, res, next) {
    connectionapp.query('SELECT * FROM usuarios where token = ?',[req.body.token],async function (error, results, fields) {
        res.setHeader("Content-Type", "application/json");
        if (error){
            console.log("[mysql error]",error);
        }else if(results.length > 0){
            var result = await update(req.body);

            if(result){
                res.json({codigo: 200,mensaje: 'Informacion actualizada.'});
            }else{
                res.json({codigo: 400,mensaje: 'Problemas al actualizar la informacion.'});
            }
        }else{
            res.json({codigo: 400,mensaje: 'Sesion caducada, inicie sesion nuevamente'});
        }

        res.end();  
    });
});

function registro(datos){
    return new Promise(async function(resolve , reject){
        var pw = await generaHash(datos.contra);
        connectionapp.query('call insertClient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            datos.usuario,pw,'',datos.nombre,datos.apellidos,datos.estado,datos.ciudad,
            datos.telefono,datos.email,datos.cp,datos.colonia,datos.calle,datos.numeroint,datos.numeroext
        ],
        function (error, results, fields) {
            if (error){
                console.log("[mysql error]",error);
            }else if(results.length > 0){
                resolve(results[3]);
            }else{
                resolve(false);
            }
        });
    });
}

function update(datos){
    return new Promise(async function(resolve , reject){
        var pw = await generaHash(datos.contra);

        connectionapp.query('call updateClient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            datos.usuario,pw,datos.nombre,datos.apellidos,datos.estado,datos.ciudad,datos.telefono,datos.email,
            datos.cp,datos.colonia,datos.calle,datos.numeroint,datos.numeroext,datos.idusuario,datos.idcliente,datos.iddireccion
        ],
        function (error, results, fields) {
            if (error){
                console.log("[mysql error]",error);
            }else if(results.length > 0){
                resolve(results);
            }else{
                resolve(false);
            }
        });
    });
}

function generaHash(pw){
    return new Promise( function(resolve , reject){
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(pw, salt, 2048, 32, 'sha512').toString('hex');
        resolve([salt, hash].join('$'));
        //https://hptechblogs.com/password-hashing-in-node-js-using-the-pbkdf2-in-crypto-library/
    });
}

function compareHash(hash1,pw){
    return new Promise( function(resolve , reject){
        const originalHash = hash1.split('$')[1];
        const salt = hash1.split('$')[0];
        const hash2 = crypto.pbkdf2Sync(pw, salt, 2048, 32, 'sha512').toString('hex');
        resolve(hash2 === originalHash)
    });
}

function updateToken(id,tokenpw){
    return new Promise(async function(resolve , reject){
        var tk = await generaHash(tokenpw+id);
        connectionapp.query('call loginApp(?,?)',[tk,id],async function (error, results, fields) {
            if (error){
                console.log("[mysql error]",error);
            }else{
                resolve(results[0]);
            }
        });
    });
}

module.exports = router;
