const { Employee, User } = require('../models');

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  const user = {
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    imageUrl: req.body.imageUrl,
    address: req.body.address,
    dob: req.body.dob,
    idRole: req.body.idRole,
    isActivated: true,
  };
  // Save Employee in the database
  User.create(user)
    .then(createdUser => {
      Employee.create({
        idUser: createdUser.idUser,
        isDeleted: false,
      }).then(createdEmployee => {
        const response = {
          ...createdUser.dataValues,
          createdEmployee,
        };
        res.send({ response });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Employee.',
      });
    });
};

// Retrieve all Employees from the database.
const findAll = (req, res) => {
  Employee.findAll({
    include: [{ model: User }],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving employees.',
      });
    });
};

// Find a single Employee with an id
const findOne = (req, res) => {
  const idEmployee = req.params.idEmployee;

  Employee.findByPk(idEmployee)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Employee with idEmployee=${idEmployee}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error retrieving Employee with id=' + idEmployee,
      });
    });
};

// Update a Employee by the id in the request
const update = (req, res) => {
  const idEmployee = req.params.idEmployee;

  Employee.update(req.body, {
    where: { idEmployee: idEmployee },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Employee was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${idEmployee}. Maybe Employee was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error updating Employee with id=' + idEmployee,
      });
    });
};

// Delete a Employee with the specified id in the request
const remove = (req, res) => {
  const idEmployee = req.params.idEmployee;

  Employee.destroy({
    where: { idEmployee: idEmployee },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Employee was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${idEmployee}. Maybe Employee was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Could not delete Employee with id=' + idEmployee,
      });
    });
};

module.exports = { create, findAll, findOne, update, remove };
