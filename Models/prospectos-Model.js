module.exports = {
    getProspectos: function (filtro) {
        var sql = ''

        if(filtro && filtro != ''){
            sql = " WHERE b.nombre = '"+filtro+"'"
        }

        return new Promise((resolve, reject) => {
            connectionapp.query(
                'SELECT a.*,b.nombre as estatus,b.color '+
                'FROM prospectos a '+
                'INNER JOIN estatus b ON a.idestatus = b.id' + sql
            ,async function (error, results, fields) {
                resolve(results)
            })
        });
    },
    setProspecto: function (prospecto) {
        return new Promise((resolve, reject) => {
            connectionapp.query(
                'INSERT INTO prospectos SET ?'
            ,prospecto
            ,async function (error, results, fields) {
                resolve(results)
            })
        });
    },
    saveFile: function (file,idprospecto){
        return new Promise((resolve, reject) => {
            var path = './public/docs/'+idprospecto+'/'+file.nombre+'-'+idprospecto+'.png'

            fs.writeFile(path, file.documento, 'base64', 
                error => {
                if (error) {
                    throw error;
                } else {
                    connectionapp.query(
                        'INSERT INTO documentos SET ?'
                    ,{nombre: file.nombre,direccion: path,idprospecto: idprospecto}
                    ,async function (error, results, fields) {
                        resolve(results)
                    })

                }
            });
        });
    }
  };