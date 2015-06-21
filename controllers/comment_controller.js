var models = require('../model/models.js');

//GET /quizes/:quizID/comments/new
exports.new = function(req, res) {
  res.render('comments/new.ejs', {quizid: req.params.quizID, errors: [] });
};

//POST /quizes/:quizID/comments
exports.create = function(req, res) {
  console.log("req.params.quizID: " + req.params.quizID );
  var comment = models.Comment.build(
      {
        texto: req.body.comment.texto,
        QuizId: req.params.quizID
      });
  console.log(comment);
  
  comment
  .validate()
  .then(
      function(err) {
        if (err) {
          res.render('comments/new.ejs',
              { comment: comment, quizid: req.params.quizID, errors: err.errors }
          );
        } else {
          comment
          .save()
          .then( function() { res.redirect('/quizes/' + req.params.quizID )});
        }
      }
    ).catch(function(error) { next(error) });
}