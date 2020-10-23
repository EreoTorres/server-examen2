module.exports = {
    getClientes: function () {
        return new Promise((resolve, reject) => {
            connectionapp.query(
                'SELECT * FROM clientes'
            ,async function (error, results, fields) {
                resolve(results)
            })
        });
    },
    setClientes: function (cliente) {
        return new Promise((resolve, reject) => {
            if(!cliente.mApellido){
                cliente.mApellido = ''
            }

            if(cliente.id == 0){
                connectionapp.query(
                    'INSERT INTO clientes SET ?'
                ,{
                    nombre: cliente.nombre,
                    pApellido: cliente.pApellido,
                    mApellido: cliente.mApellido,
                    rfc: cliente.rfc,
                }
                ,async function (error, results, fields) {
                    resolve(results)
                })
            }else{
                connectionapp.query(
                    'UPDATE clientes SET nombre = ?,pApellido = ?,mApellido = ?,rfc = ? WHERE (id = ?)'
                ,[
                    cliente.nombre,
                    cliente.pApellido,
                    cliente.mApellido,
                    cliente.rfc,
                    cliente.id
                ]
                ,async function (error, results, fields) {
                    resolve(results)
                })
            }
        });
    },
  };