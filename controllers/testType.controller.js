const { TestType, Exam } = require('../models');
const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a TestType
  const testType = {
    typeName: req.body.typeName,
  };
  // Save TestType in the database
  TestType.create(testType)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the TestType.',
      });
    });
};

// Retrieve all TestType from the database.
const findAll = (req, res) => {
  TestType.findAll({
    include: [
      {
        model: Exam,
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving TestType',
      });
    });
};

// Find a single TestType with an id
const findOne = (req, res) => {
  const OfTestidTy = req.params.OfTestidTy;

  TestType.findByPk(OfTestidTy, {
    include: [
      {
        model: Exam,
      },
    ],
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find TestType.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving TestType',
      });
    });
};

// Update a TestType by the id in the request
const update = (req, res) => {
  const OfTestidTy = req.params.OfTestidTy;

  TestType.update(req.body, {
    where: { OfTestidTy: OfTestidTy },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'TestType was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update TestType. Maybe TestType was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating TestType',
      });
    });
};

// Delete a TestType with the specified id in the request
const remove = (req, res) => {
  const OfTestidTy = req.params.OfTestidTy;
  TestType.destroy({
    where: { OfTestidTy: OfTestidTy },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'TestType was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete TestType. Maybe TestType was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete TestType',
      });
    });
};
module.exports = { create, findAll, findOne, update, remove };
