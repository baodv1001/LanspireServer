module.exports = app => {
  const employee = require('../controllers/employee.controller.js');

  var router = require('express').Router();

  // Create a new Employee
  router.post('/', employee.create);

  // Retrieve all Employee
  router.get('/', employee.findAll);

  // Retrieve a single Employee with id
  router.get('/:idEmployee', employee.findOne);

  // Update a Employee with id
  router.put('/:idEmployee', employee.update);

  // Delete a Employee with id
  router.delete('/:idEmployee', employee.delete);

  app.use('/api/employees', router);
};
