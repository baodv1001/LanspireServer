module.exports = app => {
  const noti_Account = require('../controllers').Noti_Account;

  var router = require('express').Router();

  // Create a new noti_Account
  router.post('/', noti_Account.create);

  // Retrieve all noti_Account
  router.get('/', noti_Account.findAll);

  // Retrieve a single noti_Account with id
  router.get('/:idNotiAccount', noti_Account.findOne);

  // // Update a noti_Account with id
  router.put('/:idNotiAccount', noti_Account.update);

  // // Delete a noti_Account with id
  router.delete('/:idNotiAccount', noti_Account.remove);

  app.use('/api/NotiAccounts', router);
};
