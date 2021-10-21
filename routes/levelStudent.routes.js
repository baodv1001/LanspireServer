module.exports = app => {
  const levelStudent = require('../controllers/levelStudent.controller.js');

  var router = require('express').Router();

  // Create a new levelStudent
  router.post('/', levelStudent.create);

  // Retrieve all levelStudent
  router.get('/', levelStudent.findAll);

  // Retrieve a single levelStudent with id
  router.get('/:idStudent/:idLevel', levelStudent.findOne);

  // Update a levelStudent with id
  router.put('/:idStudent/:idLevel', levelStudent.update);

  // Delete a levelStudent with id
  router.delete('/:idStudent/:idLevel', levelStudent.remove);

  app.use('/api/levelStudents', router);
};
