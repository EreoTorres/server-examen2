module.exports = {
    getCupones: function () {
        return new Promise((resolve, reject) => {
            connectionapp.query(
                'SELECT * FROM cupones'
            ,async function (error, results, fields) {
                resolve(results)
            })
        });
    },
    searchCupon: function (cupon) {
        return new Promise((resolve, reject) => {
            connectionapp.query(
                'SELECT * FROM cupones WHERE codigo = ?',
                [cupon]
            ,async function (error, results, fields) {
                resolve(results)
            })
        });
    },
    setCupones: function (cupon) {
        return new Promise((resolve, reject) => {
            if(cupon.id == 0){
                connectionapp.query(
                    'INSERT INTO cupones SET ?'
                ,{
                    codigo: cupon.codigo,
                    tipo: cupon.tipo,
                    descuento: cupon.descuento,
                }
                ,async function (error, results, fields) {
                    resolve(results)
                })
            }else{
                connectionapp.query(
                    'UPDATE cupones SET codigo = ?,tipo = ?,descuento = ? WHERE (id = ?)'
                ,[
                    cupon.codigo,
                    cupon.tipo,
                    cupon.descuento,
                    cupon.id
                ]
                ,async function (error, results, fields) {
                    resolve(results)
                })
            }
        });
    },
  };