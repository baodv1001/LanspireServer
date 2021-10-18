module.exports = app => {
  const student = require('../controllers/student.controller.js');

  var router = require('express').Router();

  // Create a new Student
  router.post('/', student.create);

  // Retrieve all Student
  router.get('/', student.findAll);

  // Retrieve a single Student with id
  router.get('/:idStudent', student.findOne);

  // Update a Student with id
  router.put('/:idStudent', student.update);

  // Delete a Student with id
  router.delete('/:idStudent', student.delete);

  app.use('/api/students', router);
};
