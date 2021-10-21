module.exports = app => {
  const typeOfTest = require('../controllers/typeOfTest.controller.js');

  var router = require('express').Router();

  // Create a new TypeOfTest
  router.post('/', typeOfTest.create);

  // Retrieve all TypeOfTest
  router.get('/', typeOfTest.findAll);

  // Retrieve a single TypeOfTest with id
  router.get('/:idTypeOfTest', typeOfTest.findOne);

  // Update a TypeOfTest with id
  router.put('/:idTypeOfTest', typeOfTest.update);

  // Delete a TypeOfTest with id
  router.delete('/:idTypeOfTest', typeOfTest.remove);

  app.use('/api/typeOfTests', router);
};
