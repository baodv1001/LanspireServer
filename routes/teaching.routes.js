module.exports = app => {
  const teaching = require('../controllers').Teaching;

  const router = require('express').Router();

  // Create a new teaching
  router.post('/', teaching.create);

  // Retrieve all teaching
  router.get('/', teaching.findAll);

  // // Retrieve a single teaching with id
  router.get('/:idTeaching', teaching.findOne);

  // // Update a teaching with id
  router.put('/:idTeaching', teaching.update);

  // // Delete a teaching with id
  router.delete('/:idTeaching', teaching.remove);

  app.use('/api/teachings', router);
};
