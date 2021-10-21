module.exports = app => {
  const exam = require('../controllers/exam.controller.js');

  var router = require('express').Router();

  // Create a new Exam
  router.post('/', exam.create);

  // Retrieve all Exam
  router.get('/', exam.findAll);

  // Retrieve a single Exam with id
  router.get('/:idExam', exam.findOne);

  // Update a Exam with id
  router.put('/:idExam', exam.update);

  // Delete a Exam with id
  router.delete('/:idExam', exam.remove);

  app.use('/api/exams', router);
};
