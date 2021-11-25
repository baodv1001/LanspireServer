const { Bill, BillInfo, Student, Employee } = require('../models');

const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
      return;
    }

    // Create a Bill
    const bill = {
      idUser: req.body.idUser,
      idStudent: req.body.idStudent,
      createdDate: req.body.createdDate,
      totalFee: req.body.totalFee,
    };
    // Save Bill in the database
    const newBill = await Bill.create(bill);

    //create billInfo
    for (let i = 0; i < req.body.BillInfos.length; ++i) {
      const billInfo = await BillInfo.create({
        idBill: newBill.idBill,
        ...req.body.BillInfos[i],
      });
    }
    const data = await Bill.findByPk(newBill.idBill, {
      include: [
        {
          model: BillInfo,
        },
      ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Retrieve all Bill from the database.
const findAll = (req, res) => {
  Bill.findAll({
    include: [
      {
        model: BillInfo,
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Find a single Bill with an id
const findOne = (req, res) => {
  const idBill = req.params.idBill;

  Bill.findByPk(idBill, {
    include: [
      {
        model: BillInfo,
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
          model: BillInfo,
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

module.exports = { create, findAll, findOne, update, remove };
