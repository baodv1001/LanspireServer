module.exports = app => {
  const lecturer = require('../controllers/lecturer.controller.js');

  var router = require('express').Router();

  // Create a new Lecturer
  router.post('/', lecturer.create);

  // Retrieve all Lecturer
  router.get('/', lecturer.findAll);

  // Retrieve a single Lecturer with id
  router.get('/:idLecturer', lecturer.findOne);

  // Update a Lecturer with id
  router.put('/:idLecturer', lecturer.update);

  // Delete a Lecturer with id
  router.delete('/:idLecturer', lecturer.delete);

  app.use('/api/lecturers', router);
};
