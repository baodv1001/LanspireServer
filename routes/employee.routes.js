module.exports = app => {
  const { Employee } = require('../controllers');

  var router = require('express').Router();

  // Create a new Employee
  router.post('/', Employee.create);

  // Retrieve all Employee
  router.get('/', Employee.findAll);

  // Retrieve a single Employee with id
  router.get('/:idEmployee', Employee.findOne);

  // Update a Employee with id
  router.put('/:idEmployee', Employee.update);

  // Delete a Employee with id
  router.delete('/:idEmployee', Employee.remove);

  app.use('/api/employees', router);
};
