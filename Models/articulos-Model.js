module.exports = {
    getArticulos: function () {
        return new Promise((resolve, reject) => {
            connectionapp.query(
                'SELECT * FROM articulos'
            ,async function (error, results, fields) {
                resolve(results)
            })
        });
    },
    setArticulos: function (articulo) {
        return new Promise((resolve, reject) => {
            if(articulo.id == 0){
                connectionapp.query(
                    'INSERT INTO articulos SET ?'
                ,{
                    descripcion: articulo.descripcion,
                    modelo: articulo.modelo,
                    precio: articulo.precio,
                    existencia: articulo.existencia,
                }
                ,async function (error, results, fields) {
                    resolve(results)
                })
            }else{
                connectionapp.query(
                    'UPDATE articulos SET descripcion = ?,modelo = ?,precio = ?,existencia = ? WHERE (id = ?)'
                ,[
                    articulo.descripcion,
                    articulo.modelo,
                    articulo.precio,
                    articulo.existencia,
                    articulo.id
                ]
                ,async function (error, results, fields) {
                    resolve(results)
                })
            }
        });
    },
  };