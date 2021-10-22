module.exports = app => {
  const center = require('../controllers').Center;

  const router = require('express').Router();

  // Create a new Center
  router.post('/', center.create);

  // Retrieve all Center
  router.get('/', center.findAll);

  // // Retrieve a single Center with id
  router.get('/:idCenter', center.findOne);

  // // Update a Center with id
  router.put('/:idCenter', center.update);

  // // Delete a Center with id
  router.delete('/:idCenter', center.remove);

  app.use('/api/centers', router);
};
