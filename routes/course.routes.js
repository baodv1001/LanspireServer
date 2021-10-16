module.exports = app => {
  const course = require('../controllers/course.controller.js');

  var router = require('express').Router();

  // Create a new Course
  router.post('/', course.create);

  // Retrieve all Course
  router.get('/', course.findAll);
  // Retrieve all Course by idType
  router.get('/:idTypeOfCourse', course.findByIdType);

  // Retrieve a single Course with id
  router.get('/:idCourse', course.findOne);

  // Update a Course with id
  router.put('/:idCourse', course.update);

  // Delete a Course with id
  router.delete('/:idCourse', course.delete);

  app.use('/api/courses', router);
};
