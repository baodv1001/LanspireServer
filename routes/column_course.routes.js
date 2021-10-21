module.exports = app => {
  const { Column_Course } = require('../controllers');

  var router = require('express').Router();

  // Create a new Column_Course
  router.post('/', Column_Course.create);

  // Retrieve all Column_Course
  router.get('/', Column_Course.findAll);

  // Retrieve a single Column_Course with id
  router.get('/:idColumn/:idCourse', Column_Course.findOne);

  // Update a Column_Course with id
  router.put('/:idColumn/:idCourse', Column_Course.update);

  // Delete a Column_Course with id
  router.delete('/:idColumn/:idCourse', Column_Course.remove);

  app.use('/api/column_courses', router);
};
