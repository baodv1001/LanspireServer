module.exports = app => {
  const { Lecturer } = require('../controllers');

  var router = require('express').Router();

  // Create a new Lecturer
  router.post('/', Lecturer.create);

  // Retrieve all Lecturer
  router.get('/', Lecturer.findAll);

  // Retrieve a single Lecturer with id
  router.get('/:idLecturer', Lecturer.findOne);

  // Update a Lecturer with id
  router.put('/:idLecturer', Lecturer.update);

  // Delete a Lecturer with id
  router.delete('/:idLecturer', Lecturer.remove);

  app.use('/api/lecturers', router);
};
