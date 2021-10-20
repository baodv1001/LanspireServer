module.exports = app => {
  const course = require('../controllers').Course;

  var router = require('express').Router();

  // Create a new Course
  router.post('/', course.create);

  // Retrieve all Course
  router.get('/', course.findAll);

  // Retrieve a single Course with id
  router.get('/:idCourse', course.findOne);

  // Update a Course with id
  router.put('/:idCourse', course.update);

  // Delete a Course with id
  router.delete('/:idCourse', course.remove);

  app.use('/api/courses', router);
};
