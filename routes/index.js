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

//Definicion de rutas de sesión
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/quizes', quizcontroller.index);
router.get('/quizes/:quizID(\\d+)', quizcontroller.show);
router.get('/quizes/:quizID(\\d+)/answer', quizcontroller.answer);
router.get('/quizes/new', sessionController.loginRequired, quizcontroller.new);
router.post('/quizes/create', sessionController.loginRequired, quizcontroller.create);
router.get('/quizes/:quizID(\\d+)/edit', sessionController.loginRequired, quizcontroller.edit);
router.put('/quizes/:quizID(\\d+)', sessionController.loginRequired, quizcontroller.update);
router.delete('/quizes/:quizID(\\d+)',  sessionController.loginRequired, quizcontroller.destroy);

router.get('/quizes/:quizID(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizID(\\d+)/comments', commentController.create);

router.get('/author', quizcontroller.author);

module.exports = router;
