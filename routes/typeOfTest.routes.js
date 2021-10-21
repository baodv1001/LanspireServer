module.exports = app => {
  const { TypeOfTest } = require('../controllers');

  var router = require('express').Router();

  // Create a new TypeOfTest
  router.post('/', TypeOfTest.create);

  // Retrieve all TypeOfTest
  router.get('/', TypeOfTest.findAll);

  // Retrieve a single TypeOfTest with id
  router.get('/:idTypeOfTest', TypeOfTest.findOne);

  // Update a TypeOfTest with id
  router.put('/:idTypeOfTest', TypeOfTest.update);

  // Delete a TypeOfTest with id
  router.delete('/:idTypeOfTest', TypeOfTest.remove);

  app.use('/api/typeOfTests', router);
};
