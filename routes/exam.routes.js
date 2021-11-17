module.exports = app => {
  const { Exam } = require('../controllers');

  var router = require('express').Router();

  // Create a new Exam
  router.post('/', Exam.create);

  // Retrieve all Exam
  router.get('/', Exam.findAll);

  // Retrieve a single Exam with id
  router.get('/:idExam', Exam.findOne);

  // Retrieve a single Exam with idClass
  router.get('/class/:idClass', Exam.findByIdClass);

  // Update a Exam with id
  router.patch('/:idExam', Exam.update);

  // Delete a Exam with id
  router.delete('/:idExam', Exam.remove);

  app.use('/api/exams', router);
};
