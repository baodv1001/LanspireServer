const { Bill, BillInfo, Class, Student, User, Course } = require('../models');

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
    console.log(bill.createdDate);
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
          model: Class,
          include: { model: Course },
        },
        {
          model: User,
        },
        {
          model: Student,
          include: { model: User },
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
        model: Class,
        include: { model: Course },
      },
      {
        model: User,
      },
      {
        model: Student,
        include: { model: User },
      },
    ],
    where: {
      isDeleted: false,
    },
    order: [['createddate', 'DESC']],
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
        model: Class,
        include: { model: Course },
      },
      {
        model: User,
      },
      {
        model: Student,
        include: { model: User },
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
      res.status(500).send({ message: err.message });
    });
};

// Update a Bill by the id in the request
const update = (req, res) => {
  const { idBill } = req.params;

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
  const { idBill } = req.params;

  Bill.update(
    { isDeleted: true },
    {
      where: { idBill: idBill },
    }
  )
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
      res.status(500).send(err.message);
    });
};

module.exports = { create, findAll, findOne, update, remove };
