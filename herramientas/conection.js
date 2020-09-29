    global.connectionapp = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'examen',  
        port: 3306
    });
  
    connectionapp.connect(function(error){
        if(error){
           throw error;
        }else{
           console.log('Conexion correcta BD.');
        }
    });