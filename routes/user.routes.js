module.exports = app => {
  const user = require('../controllers/user.controller.js');

  var router = require('express').Router();

  // Create a new User
  router.post('/', user.create);

  // Retrieve all User
  router.get('/', user.findAll);

  // Retrieve a single User with id
  router.get('/:idUser', user.findOne);

  // Update a User with id
  router.put('/:idUser', user.update);

  // Delete a User with id
  router.delete('/:idUser', user.delete);

  app.use('/api/users', router);
};
