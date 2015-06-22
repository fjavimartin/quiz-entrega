var express = require('express');
var router = express.Router();

var quizcontroller = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comandos con :quizID
router.param('quizID', quizcontroller.load);
router.param('commentID', commentController.load);

//Definicion de rutas de sesión
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/quizes', sessionController.checkSession, quizcontroller.index);
router.get('/quizes/:quizID(\\d+)', sessionController.checkSession, quizcontroller.show);
router.get('/quizes/:quizID(\\d+)/answer', sessionController.checkSession, quizcontroller.answer);
router.get('/quizes/new', sessionController.checkSession, sessionController.loginRequired, quizcontroller.new);
router.post('/quizes/create', sessionController.checkSession, sessionController.loginRequired, quizcontroller.create);
router.get('/quizes/:quizID(\\d+)/edit', sessionController.checkSession, sessionController.loginRequired, quizcontroller.edit);
router.put('/quizes/:quizID(\\d+)', sessionController.checkSession, sessionController.loginRequired, quizcontroller.update);
router.delete('/quizes/:quizID(\\d+)',  sessionController.checkSession, sessionController.loginRequired, quizcontroller.destroy);

router.get('/quizes/:quizID(\\d+)/comments/new', sessionController.checkSession, commentController.new);
router.post('/quizes/:quizID(\\d+)/comments', sessionController.checkSession, commentController.create);
router.get('/quizes/:quizID(\\d+)/comments/:commentID(\\d+)/publish', sessionController.checkSession, sessionController.loginRequired, commentController.publish);

router.get('/author', sessionController.checkSession, quizcontroller.author);

module.exports = router;
