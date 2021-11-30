module.exports = app => {
  const { TestType } = require('../controllers');

  var router = require('express').Router();

  // Create a new TestType
  router.post('/', TestType.create);

  // Retrieve all TestType
  router.get('/', TestType.findAll);

  // Retrieve a single TestType with id
  router.get('/:idTestType', TestType.findOne);

  // Update a TestType with id
  router.put('/:idTestType', TestType.update);

  // Delete a TestType with id
  router.delete('/:idTestType', TestType.remove);

  app.use('/api/testtypes', router);
};
