const { authJwt } = require('../middlewares/index');
module.exports = app => {
  const { User } = require('../controllers');

  var router = require('express').Router();

  // Create a new User
  router.post('/', [authJwt.verifyToken], User.create);

  // Retrieve all User
  router.get('/', [authJwt.verifyToken], User.findAll);

  // Retrieve a single User with id
  router.get('/:idUser', [authJwt.verifyToken], User.findOne);

  // Update a User with id
  router.put('/:idUser', [authJwt.verifyToken], User.update);

  // Delete a User with id
  router.delete('/:idUser', [authJwt.verifyToken], User.remove);

  app.use('/api/users', router);
};
