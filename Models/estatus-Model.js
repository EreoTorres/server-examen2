module.exports = {
    getEstatus: function () {
        return new Promise((resolve, reject) => {
            connectionapp.query(
                'SELECT * FROM estatus'
            ,async function (error, results, fields) {
                resolve(results)
            })
        });
    },
};