module.exports = app => {
  const level = require('../controllers').Level;

  const router = require('express').Router();

  // Create a new level
  router.post('/', level.create);

  // Retrieve all level
  router.get('/', level.findAll);

  // // Retrieve a single level with id
  router.get('/:idLevel', level.findOne);

  // // Update a level with id
  router.put('/:idLevel', level.update);

  // // Delete a level with id
  router.delete('/:idLevel', level.remove);

  app.use('/api/levels', router);
};
