module.exports = app => {
  const typeOfCourse = require('../controllers').TypeOfCourse;

  var router = require('express').Router();

  // Create a new typeOfCourse
  router.post('/', typeOfCourse.create);

  // Retrieve all typeOfCourse
  router.get('/', typeOfCourse.findAll);

  // Retrieve a single typeOfCourse with id
  router.get('/:idTypeOfCourse', typeOfCourse.findOne);

  // Update a typeOfCourse with id
  router.put('/:idTypeOfCourse', typeOfCourse.update);

  // Delete a typeOfCourse with id
  router.delete('/:idTypeOfCourse', typeOfCourse.remove);

  app.use('/api/typeofcourses', router);
};
