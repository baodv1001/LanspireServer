module.exports = app => {
  const { Account } = require('../controllers');
  const { authJwt } = require('../middlewares');
  var router = require('express').Router();

  // Create a new Account
  router.post('/', Account.create);

  // Retrieve all Account
  router.get('/', Account.findAll);

  // Retrieve a single Account with id
  router.get('/:idAccount', Account.findOne);

  // Update a Account with id
  router.put('/:idAccount', Account.update);

  // Delete a Account with id
  router.delete('/:idAccount', Account.remove);

  app.use('/api/accounts', router);
};
