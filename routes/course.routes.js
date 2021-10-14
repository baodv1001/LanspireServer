module.exports = app => {
  const course = require('../controllers/course.controller.js');

  var router = require('express').Router();

  // Create a new Bill
  router.post('/', course.create);

  // Retrieve all Bill
  router.get('/', course.findAll);

  // Retrieve a single Bill with id
  router.get('/:idcourse', course.findOne);

  // Update a Bill with id
  router.put('/:idcourse', course.update);

  // Delete a Bill with id
  router.delete('/:idcourse', course.delete);

  app.use('/api/courses', router);
};
