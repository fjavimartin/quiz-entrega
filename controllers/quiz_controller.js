var models = require('../model/models.js');

//Autoload - factoriza el código si ruta incluye :quizID
exports.load = function (req, res, next, quizID) {
  models.Quiz.find(quizID).then(
      function(quiz) {
        if (quiz) {
          req.quiz = quiz;
          next();
        } else {
          next (new Error('No existe quizID=' + quizID));
        }
      }
  ).catch(function(error) { next(error); });
};

//GET /quizes
exports.index = function( req, res) {
  if ( req.query.search === undefined ) {
    models.Quiz.findAll().then( function (quizes) {
      res.render('quizes/index.ejs', { quizes: quizes });
    }).catch(function(error) { next(error); });
  } else {
    var cadena = '%' + req.query.search.split(' ').join('%') + '%';
    models.Quiz.findAll({where: ["pregunta like ?", cadena]}).then( function (quizes) {
      res.render('quizes/index.ejs', { quizes: quizes });
    }).catch(function(error) { next(error); });
  }
};

//GET /quizes/:id
exports.show = function(req, res) {
    res.render('quizes/show', { quiz: req.quiz });
};

//GET /quizes/:id/answer
exports.answer = function ( req, res ) {
  var resultado = 'Incorrecto';
  if ( req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado} );
};

//GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
      { pregunta: "Pregunta", respuesta: "Respuesta" }
  );
  
  res.render('quizes/new', { quiz: quiz });
};

//POST /quizes/create
exports.create = function(req, res) {
  
  var quiz = models.Quiz.build( req.body.quiz );
  console.log( quiz );
  
  //guarda en DB los campos pregunta y respuesta de quiz
  quiz.save({fields: ["pregunta", "respuesta"]}).then( function() {
    res.redirect('/quizes');
  });
  
};

//GET /author
exports.author = function ( req, res ) {
	res.render('author');
}