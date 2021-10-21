module.exports = app => {
  const { Parameter } = require('../controllers');

  var router = require('express').Router();

  // Create a new Lecturer
  router.post('/', Parameter.create);

  // Retrieve all Lecturer
  router.get('/', Parameter.findAll);

  // Retrieve a single Lecturer with id
  router.get('/:idLecturer', Parameter.findOne);

  // Update a Lecturer with id
  router.put('/:idLecturer', Parameter.update);

  // Delete a Lecturer with id
  router.delete('/:idLecturer', Parameter.remove);

  app.use('/api/parameters', router);
};
