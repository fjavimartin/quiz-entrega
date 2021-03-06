//MW de autorización de accesos HTTP restringidos
exports.loginRequired = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

//Chequea Sesion
exports.checkSession = function (req, res, next) {
  if (req.session.user) {
    console.log('checksession: ' + req.session.user.username + ' ' + req.session.user.ultima_op );
    var max_idle_time = process.env.MAX_IDLE_TIME;
    var now = new Date();
    if (now.valueOf() - req.session.user.ultima_op > max_idle_time) {
      delete req.session.user;
    } else {
      req.session.user.ultima_op = now.valueOf();
      console.log('checksession: ' + req.session.user.username + ' ' + req.session.user.ultima_op);
    }
  }
  next();
}

//GET /login -- Formulario de login
exports.new = function(req, res) {
  var errors = req.session.errors || {};
  req.session.errors = {};
  
  res.render('sessions/new', { errors: errors });
}

//POST /login --Crear la sesión
exports.create = function(req, res) {
  var login = req.body.login;
  var password = req.body.password;
  
  var userController = require('./user_controller');
  userController.autenticar(login, password, function(error, user) {
    if (error) {
      req.session.errors = [{"message": 'Se ha producido un error: ' + error }];
      res.redirect("/login");
      return;
    }
    
    // Crear req.session.user y guardar campos id y username
    // La sesión se define por la existencia de: req.session.user
    req.session.user = {id: user.id, username: user.username, ultima_op: new Date().valueOf() };
    
    res.redirect( req.session.redir.toString() ); //redirección a path anterior al login
  });
};

exports.destroy = function(req, res) {
  delete req.session.user;
  res.redirect(req.session.redir.toString()); //redirect a path anterior al login
}