module.exports = app => {
  const bill = require('../controllers/bill.controller.js');

  var router = require('express').Router();

  // Create a new Bill
  router.post('/', bill.create);

  // Retrieve all Bill
  router.get('/', bill.findAll);

  // Retrieve a single Bill with id
  router.get('/:idBill', bill.findOne);

  // Update a Bill with id
  router.put('/:idBill', bill.update);

  // Delete a Bill with id
  router.delete('/:idBill', bill.delete);

  app.use('/api/bills', router);
};
