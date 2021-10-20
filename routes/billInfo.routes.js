module.exports = app => {
  const billInfo = require('../controllers').BillInfo;

  var router = require('express').Router();

  // Create a new BillInfo
  router.post('/', billInfo.create);

  // Retrieve all BillInfo with idBill
  router.get('/:idBill', billInfo.findAll);

  // Retrieve a single BillInfo with idBill and idCourse
  router.get('/:idBill/:idCourse', billInfo.findOne);

  // Update a BillInfo with idbill and idcourse
  router.put('/:idBill/:idCourse', billInfo.update);

  // Delete a BillInfo with id
  router.delete('/:idBill/:idCourse', billInfo.remove);

  app.use('/api/billInfos', router);
};
