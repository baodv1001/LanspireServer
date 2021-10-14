module.exports = app => {
  const billInfo = require('../controllers/billInfo.controller.js');

  var router = require('express').Router();

  // Create a new BillInfo
  router.post('/', billInfo.create);

  // Retrieve all BillInfo with idBill
  router.get('/:idbill', billInfo.findAll);

  // Retrieve a single BillInfo with idBill and idCourse
  router.get('/:idbill/:idcourse', billInfo.findOne);

  // Update a BillInfo with idbill and idcourse
  router.put('/:idbill/:idcourse', billInfo.update);

  // Delete a BillInfo with id
  router.delete('/:idbill/:idcourse', billInfo.delete);

  app.use('/api/billInfos', router);
};
