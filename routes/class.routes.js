module.exports = app => {
  const classRoom = require('../controllers').Class;

  var router = require('express').Router();

  // Create a new class
  router.post('/', classRoom.create);

  // Retrieve all class
  router.get('/', classRoom.findAll);

  // Retrieve a single class with id
  router.get('/:idClass', classRoom.findOne);

  // Update a class with id
  router.put('/:idClass', classRoom.update);

  // Delete a class with id
  router.delete('/:idClass', classRoom.remove);

  //Find class by idCourse
  router.get('/course/:idCourse', classRoom.findByIdCourse);

  app.use('/api/classes', router);
};
