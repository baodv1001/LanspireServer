module.exports = app => {
  const column_course = require('../controllers/column_course.controller.js');

  var router = require('express').Router();

  // Create a new column_course
  router.post('/', column_course.create);

  // Retrieve all column_course
  router.get('/', column_course.findAll);

  // Retrieve a single column_course with id
  router.get('/:idColumn/:idCourse', column_course.findOne);

  // Update a column_course with id
  router.put('/:idColumn/:idCourse', column_course.update);

  // Delete a column_course with id
  router.delete('/:idColumn/:idCourse', column_course.remove);

  app.use('/api/column_course', router);
};
