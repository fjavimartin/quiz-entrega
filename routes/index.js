var express = require('express');
var router = express.Router();

var quizcontroller = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comandos con :quizID
router.param('quizID', quizcontroller.load);

router.get('/quizes', quizcontroller.index);
router.get('/quizes/:quizID(\\d+)', quizcontroller.show);
router.get('/quizes/:quizID(\\d+)/answer', quizcontroller.answer);
router.get('/author', quizcontroller.author);

module.exports = router;
