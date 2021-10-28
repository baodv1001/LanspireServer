module.exports = app => {
  const { CourseType } = require('../controllers');

  var router = require('express').Router();

  // Create a new CourseType
  router.post('/', CourseType.create);

  // Retrieve all CourseType
  router.get('/', CourseType.findAll);

  // Retrieve a single CourseType with id
  router.get('/:idCourseType', CourseType.findOne);

  // Update a CourseType with id
  router.put('/:idCourseType', CourseType.update);

  // Delete a CourseType with id
  router.delete('/:idCourseType', CourseType.remove);

  app.use('/api/coursetypes', router);
};
