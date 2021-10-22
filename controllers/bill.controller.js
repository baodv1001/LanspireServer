const Bill = require('../models').Bill;
const BillInfo = require('../models').BillInfo;
const Course = require('../models').Course;

const create = (req, res) => {
  // Validate request
  if (!req.body.idAccount || !req.body.idStudent) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Bill
  const bill = {
    // idBill: req.body.idBill,
    idAccount: req.body.idAccount,
    idStudent: req.body.idStudent,
    createdDate: req.body.createdDate,
    totalFee: req.body.totalFee,
  };
  // Save Bill in the database
  Bill.create(bill)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Bill.',
      });
    });
};

// Retrieve all Bill from the database.
const findAll = (req, res) => {
  Bill.findAll({
    include: [
      {
        model: Course,
        as: 'course',
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving bill.',
      });
    });
};

// Find a single Bill with an id
const findOne = (req, res) => {
  const idBill = req.params.idBill;

  Bill.findByPk(idBill, {
    include: [
      {
        model: Course,
        as: 'course',
      },
    ],
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Bill with idBill=${idBill}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Bill with id=' + idBill,
      });
    });
};

// Update a Bill by the id in the request
const update = (req, res) => {
  const idBill = req.params.idBill;

  Bill.update(
    req.body,
    {
      where: { idBill: idBill },
    },
    {
      include: [
        {
          model: Course,
          as: 'course',
        },
      ],
    }
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Bill was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Bill with id=${idBill}. Maybe Bill was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Bill with id=' + idBill,
      });
    });
};

// Delete a Bill with the specified id in the request
const remove = (req, res) => {
  const idBill = req.params.idBill;

  Bill.destroy({
    where: { idBill: idBill },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Bill was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Bill with id=${idBill}. Maybe Bill was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Bill with id=' + idBill,
      });
    });
};

const findByIdAccount = (req, res) => {
  Bill.findAll({ where: { idAccount: req.body.idAccount } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving bill.',
      });
    });
};

module.exports = { create, findAll, findOne, update, remove, findByIdAccount };
