var models = require('../model/models.js');

// Autoload :id de comentarios
exports.load = function(req, res, next, commentID) {
  models.Comment.find({
    where: {
      id: Number(commentID)
    }
  }).then( function(comment) {
    if (comment) {
      req.comment = comment;
      next();
    } else {
      next(new Error('No existe commentID=' + commentID) );
    }
  }).catch( function (error) { next(error) });
};

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

exports.publish = function(req, res) {
  req.comment.publicado = true;
  
  req.comment
  .save( { fields: ["publicado"] } )
  .then( function() { res.redirect('/quizes/' + req.params.quizID); } )
  .catch( function( error ) { next(error) });
};