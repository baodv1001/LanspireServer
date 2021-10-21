module.exports = app => {
  const learnings = require('../controllers/learning.controller.js');

  var router = require('express').Router();

  // Create a new ...
  router.post('/', learnings.create);

  // Retrieve all ...
  router.get('/', learnings.findAll);

  // Retrieve a single ... with id
  router.get('/:idClass/:idStudent/:idExam', learnings.findOne);

  // Update a ... with id
  router.put('/:idClass/:idStudent/:idExam', learnings.update);

  // Delete a ... with id
  router.delete('/:idClass/:idStudent/:idExam', learnings.remove);

  app.use('/api/learnings', router);
};
