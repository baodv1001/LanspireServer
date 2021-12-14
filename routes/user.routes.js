const { authJwt } = require('../middlewares/index');
module.exports = app => {
  const { User } = require('../controllers');

  var router = require('express').Router();

  // // Create a new User
  // router.post('/', [authJwt.verifyToken], User.create);

  // // Retrieve all User
  // router.get('/', [authJwt.verifyToken], User.findAll);

  // // Retrieve a single User with id
  // router.get('/:idUser', [authJwt.verifyToken], User.findOne);

  // // Update a User with id
  // router.patch('/:idUser', [authJwt.verifyToken], User.update);

  // // Delete a User with id
  // router.delete('/:idUser', [authJwt.verifyToken], User.remove);

  // Create a new User
  router.post('/', User.create);

  // Retrieve all User
  router.get('/', User.findAll);

  // Retrieve a single User with id
  router.get('/:idUser', User.findOne);

  // Update a User with id
  router.patch('/:idUser', User.update);

  // Delete a User with id
  router.delete('/:idUser', User.remove);

  app.use('/api/users', router);
};
