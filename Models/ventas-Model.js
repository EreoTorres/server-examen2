module.exports = {
    getVentas: function () {
        return new Promise((resolve, reject) => {
            connectionapp.query(
                'SELECT *,f_Cupon(idcupon) as cupon,f_Cliente(idcliente) as cliente FROM ventas'
            ,async function (error, results, fields) {
                var res = [];
                
                if(results){
                    for(let datos of results){
                        datos.articulos = JSON.stringify(await getArticuloV(datos.id))

                        res.push(datos)
                    }

                    resolve(res)
                }
            })
        });
    },
    setVentas: function (venta) {
        return new Promise((resolve, reject) => {
            connectionapp.query(
                'INSERT INTO ventas SET ?'
                ,{
                    idcliente: venta.idcliente,
                    importe: venta.importe,
                    iva: venta.iva,
                    descuento: venta.descuento,
                    total: venta.total,
                    idcupon: venta.idcupon,
                    fecha: moment().format('DD-MM-YYYY')
                }
            ,async function (error, results, fields) {
                if(results){
                    updateCupon(venta.idcupon)
                    for(let datos of venta.articulos){
                        connectionapp.query(
                            'INSERT INTO varticulos SET ?'
                            ,{
                                idarticulo: datos.idarticulo,
                                idventa: results.insertId,
                                cantidad: datos.cantidad,
                            }
                        ,async function (error, results, fields) {
                            resolve(results)
                        })
                    }
                }
            })
        });
    },
  };

function getArticuloV(id) {
    return new Promise((resolve, reject) => {
        connectionapp.query(
            'SELECT a.idarticulo,a.cantidad,b.descripcion,b.modelo,b.precio FROM varticulos a INNER JOIN articulos b ON a.idarticulo = b.id WHERE a.idventa = ?'
        ,[id]
        ,async function (error, result, fields) {
            if(result){
                resolve(result)
            }
        })
    });
}

function updateCupon(id) {
    return new Promise((resolve, reject) => {
        connectionapp.query(
            'UPDATE cupones SET usado = "1" WHERE (id = ?)'
        ,[id]
        ,async function (error, result, fields) {

        })
    });
}
