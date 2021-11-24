module.exports = app => {
  const { Parameter } = require('../controllers');

  var router = require('express').Router();

  // Create a new Parameter
  router.post('/', Parameter.create);

  // Retrieve all Parameter
  router.get('/', Parameter.findAll);

  // Retrieve a single Parameter with id
  router.get('/:idParameter', Parameter.findOne);

  // Update a Parameter with id
  router.patch('/', Parameter.update);

  // Delete a Parameter with id
  router.delete('/:idParameter', Parameter.remove);

  app.use('/api/parameters', router);
};
