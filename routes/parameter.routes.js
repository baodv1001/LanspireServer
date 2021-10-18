module.exports = app => {
  const parameter = require('../controllers/parameter.controller.js');

  var router = require('express').Router();

  // Create a new Lecturer
  router.post('/', parameter.create);

  // Retrieve all Lecturer
  router.get('/', parameter.findAll);

  // Retrieve a single Lecturer with id
  router.get('/:idLecturer', parameter.findOne);

  // Update a Lecturer with id
  router.put('/:idLecturer', parameter.update);

  // Delete a Lecturer with id
  router.delete('/:idLecturer', parameter.delete);

  app.use('/api/parameters', router);
};
