module.exports = app => {
  const { Learning } = require('../controllers');

  var router = require('express').Router();

  // Create a new ...
  router.post('/', Learning.create);

  // Retrieve all ...
  router.get('/', Learning.findAll);

  // Retrieve a single ... with id
  router.get('/:idClass/:idStudent/:idExam', Learning.findOne);

  // Update a ... with id
  router.put('/:idClass/:idStudent/:idExam', Learning.update);

  // Delete a ... with id
  router.delete('/:idClass/:idStudent/:idExam', Learning.remove);

  app.use('/api/learnings', router);
};
