module.exports = app => {
  const classroom = require('../controllers/class.controller.js');

  var router = require('express').Router();

  // Create a new class
  router.post('/', classroom.create);

  // Retrieve all class
  router.get('/', classroom.findAll);

  // Retrieve a single class with id
  router.get('/:idclass', classroom.findOne);

  // Update a class with id
  router.put('/:idclass', classroom.update);

  // Delete a class with id
  router.delete('/:idclass', classroom.delete);

  app.use('/api/classes', router);
};
