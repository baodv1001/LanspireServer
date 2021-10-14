module.exports = app => {
  const classTime = require('../controllers/classTime.controller.js');

  var router = require('express').Router();

  // Create a new classtime
  router.post('/', classTime.create);

  // Retrieve all classtime
  router.get('/:idclass', classTime.findAllByClass);

  // Retrieve a single classtime with id
  router.get('/:idclasstime', classTime.findOne);

  // Update a classtime with id
  router.put('/:idclasstime', classTime.update);

  // Delete a classtime with id
  router.delete('/:idclasstime', classTime.delete);

  app.use('/api/classtimes', router);
};
