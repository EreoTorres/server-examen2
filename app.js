  require('./librerias/librerias');
  var app = express();

  //Herramientas
  require('./herramientas/conection');
  require('./herramientas/rutas');

  //cors
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Authorization, X-Requested-With, Accept, Content-Type, Origin, Cache-Control, X-File-Name");
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  //app.use(express.static(path.join(__dirname, 'public')));

  app.use(bodyParser.json()); // support json encoded
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded

  //APP
  app.use('/prospectos', prospectos);

  app.use(function(req, res, next) {
    next(createError(404));
  });

  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render error
    res.status(err.status || 500);
    res.render('error');
  });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
  
module.exports = app;
