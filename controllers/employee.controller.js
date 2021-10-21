const { Employee, User, Account } = require('../models');

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Employee
  const employee = {
    idUser: req.body.idUser,
    idAccount: req.body.idAccount,
  };
  // Save Employee in the database
  Employee.create(employee)
    .then(data => {
      res.send(data);
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
    include: [{ model: Account }, { model: User }],
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
