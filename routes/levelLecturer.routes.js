module.exports = app => {
  const levelLecturer = require('../controllers').LevelLecturer;

  const router = require('express').Router();

  // Create a new levelLecturer
  router.post('/', levelLecturer.create);

  // Retrieve all levelLecturer
  router.get('/', levelLecturer.findAll);

  // // Retrieve a single levelLecturer with id
  router.get('/:idLevelLecturer', levelLecturer.findOne);

  // // Update a levelLecturer with id
  router.put('/:idLevelLecturer', levelLecturer.update);

  // // Delete a levelLecturer with id
  router.delete('/:idLevelLecturer', levelLecturer.remove);

  app.use('/api/levelLecturers', router);
};
