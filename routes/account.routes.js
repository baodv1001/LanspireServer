module.exports = app => {
  const account = require('../controllers/account.controller.js');

  var router = require('express').Router();

  // Create a new Account
  router.post('/', account.create);

  // Retrieve all Account
  router.get('/', account.findAll);

  // Retrieve a single Account with id
  router.get('/:idAccount', account.findOne);

  // Update a Account with id
  router.put('/:idAccount', account.update);

  // Delete a Account with id
  router.delete('/:idAccount', account.delete);

  app.use('/api/accounts', router);
};
