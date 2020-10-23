module.exports = {
    getConfiguracion: function () {
        return new Promise((resolve, reject) => {
            connectionapp.query(
                'SELECT * FROM configuracion'
            ,async function (error, results, fields) {
                resolve(results)
            })
        });
    },
    setConfiguracion: function (config) {
        return new Promise((resolve, reject) => {
            if(config.id == 0){
                connectionapp.query(
                    'INSERT INTO configuracion SET ?'
                ,{
                    iva: config.iva,
                }
                ,async function (error, results, fields) {
                    resolve(results)
                })
            }else{
                connectionapp.query(
                    'UPDATE configuracion SET iva = ? WHERE (id = ?)'
                ,[
                    config.iva,
                    config.id
                ]
                ,async function (error, results, fields) {
                    resolve(results)
                })
            }
        });
    },
  };