const { authJwt } = require('../middlewares');

module.exports = app => {
  const { Student } = require('../controllers');
  var router = require('express').Router();

  // Create a new Student
  router.post('/', Student.create);

  // Retrieve all Student
  router.get('/', Student.findAll);

  // Retrieve a single Student with id
  router.get('/:idStudent', Student.findOne);

  // Update a Student with id
  router.patch('/:idStudent', Student.update);

  // Delete a Student with id
  router.delete('/:idStudent', Student.remove);

  app.use('/api/students', router);
};
