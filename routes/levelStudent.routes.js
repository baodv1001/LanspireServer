module.exports = app => {
  const { LevelStudent } = require('../controllers');

  var router = require('express').Router();

  // Create a new LevelStudent
  router.post('/', LevelStudent.create);

  // Retrieve all LevelStudent
  router.get('/', LevelStudent.findAll);

  // Retrieve a single LevelStudent with id
  router.get('/:idStudent/:idLevel', LevelStudent.findOne);

  // Update a LevelStudent with id
  router.put('/:idStudent/:idLevel', LevelStudent.update);

  // Delete a LevelStudent with id
  router.delete('/:idStudent/:idLevel', LevelStudent.remove);

  app.use('/api/levelStudents', router);
};
