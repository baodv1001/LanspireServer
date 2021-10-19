const db = require('../models');
const TypeOfTest = db.TypeOfTest;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a TypeOfTest
  const typeOfTest = {
    nameOfTest: req.body.nameOfTest,
  };
  // Save TypeOfTest in the database
  TypeOfTest.create(typeOfTest)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the TypeOfTest.',
      });
    });
};

// Retrieve all TypeOfTest from the database.
exports.findAll = (req, res) => {
  TypeOfTest.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving TypeOfTest',
      });
    });
};

// Find a single TypeOfTest with an id
exports.findOne = (req, res) => {
  const idTypeOfTest = req.params.idTypeOfTest;

  TypeOfTest.findOne({ where: { idTypeOfTest: idTypeOfTest } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find TypeOfTest.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving TypeOfTest',
      });
    });
};

// Update a TypeOfTest by the id in the request
exports.update = (req, res) => {
  const idTypeOfTest = req.params.idTypeOfTest;

  TypeOfTest.update(req.body, {
    where: { idTypeOfTest: idTypeOfTest },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'TypeOfTest was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update TypeOfTest. Maybe TypeOfTest was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating TypeOfTest',
      });
    });
};

// Delete a TypeOfTest with the specified id in the request
exports.delete = (req, res) => {
  const idTypeOfTest = req.params.idTypeOfTest;

  TypeOfTest.update(req.body, {
    where: { idTypeOfTest: idTypeOfTest },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'TypeOfTest was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete TypeOfTest. Maybe TypeOfTest was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete TypeOfTest',
      });
    });
};
