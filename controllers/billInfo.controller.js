const db = require('../models');
const BillInfo = db.BillInfo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.idbill || !req.body.idcourse) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a billInfo
  const billInfo = {
    idbill: req.body.idbill,
    idcourse: req.body.idcourse,
    fee: req.body.fee,
  };
  // Save BillInfo in the database
  BillInfo.create(billInfo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the BillInfo.',
      });
    });
};

// Retrieve all BillInfo with idBill from the database.
exports.findAll = (req, res) => {
  BillInfo.findAll({ where: { idbill: req.params.idbill } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving billinfo.',
      });
    });
};

// Find a single BillInfo with an idbillinfo and idcourse
exports.findOne = (req, res) => {
  const idCourse = req.params.idcourse;
  const idBill = req.params.idbill;

  BillInfo.findOne({ where: { idcourse: idCourse, idbill: idBill } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find BillInfo with idBill=${idBill}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving BillInfo with idBill=${idBill} & idCouse=${idCourse}`,
      });
    });
};

// Update a BillInfo by the id in the request
exports.update = (req, res) => {
  const idBill = req.params.idbill;
  const idCourse = req.params.idcourse;
  BillInfo.update(req.body, {
    where: { idbill: idBill, idcourse: idCourse },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'BillInfo was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Bill with idBill=${idBill} & idCouse=${idCourse} . Maybe BillInfo was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating BillInfo with idBill=${idBill} & idCouse=${idCourse}`,
      });
    });
};

// Delete a BillInfo with the specified id in the request
exports.delete = (req, res) => {
  const idBill = req.params.idbill;
  const idCourse = req.params.idcourse;

  BillInfo.destroy({
    where: { idbill: idBill, idcourse: idCourse },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'BillInfo was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete BillInfowith idBill=${idBill} & idCouse=${idCourse}. Maybe BillInfo was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete BillInfo with idBill=${idBill} & idCouse=${idCourse}`,
      });
    });
};
