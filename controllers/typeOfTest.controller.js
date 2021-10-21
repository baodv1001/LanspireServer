const { TypeOfTest, Exam } = require('../models');
const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a TypeOfTest
  const typeOfTest = {
    nameOfType: req.body.nameOfType,
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
const findAll = (req, res) => {
  TypeOfTest.findAll({
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
        message: err.message || 'Some error occurred while retrieving TypeOfTest',
      });
    });
};

// Find a single TypeOfTest with an id
const findOne = (req, res) => {
  const idTypeOfTest = req.params.idTypeOfTest;

  TypeOfTest.findByPk(idTypeOfTest, {
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
const update = (req, res) => {
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
const remove = (req, res) => {
  const idTypeOfTest = req.params.idTypeOfTest;
  TypeOfTest.destroy({
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
module.exports = { create, findAll, findOne, update, remove };
