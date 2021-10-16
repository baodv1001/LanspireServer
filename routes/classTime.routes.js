module.exports = app => {
  const classTime = require('../controllers/classTime.controller.js');

  var router = require('express').Router();

  // Create a new classtime
  router.post('/', classTime.create);

  // Retrieve all classtime
  router.get('/:idClassTime', classTime.findAllByClass);

  // Retrieve a single classtime with id
  router.get('/:idClassTime', classTime.findOne);

  // Update a classtime with id
  router.put('/:idClassTime', classTime.update);

  // Delete a classtime with id
  router.delete('/:idClassTime', classTime.delete);

  app.use('/api/classtimes', router);
};
