module.exports = app => {
  const { Role } = require('../controllers');

  var router = require('express').Router();

  // Create a new Role
  router.post('/', Role.create);

  // Retrieve all Role
  router.get('/', Role.findAll);

  // Retrieve a single Role with id
  router.get('/:idRole', Role.findOne);

  // Update a Role with id
  router.put('/:idRole', Role.update);

  // Delete a Role with id
  router.delete('/:idRole', Role.remove);

  app.use('/api/roles', router);
};
