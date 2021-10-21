const { Account, Role } = require('../models');

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Account
  const account = {
    username: req.body.username,
    password: req.body.password,
    idRole: req.body.idRole,
  };
  // Save Account in the database
  Account.create(account)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Account.',
      });
    });
};

// Retrieve all Accounts from the database.
const findAll = (req, res) => {
  Account.findAll({ include: { model: Role } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving accounts.',
      });
    });
};

// Find a single Account with an id
const findOne = (req, res) => {
  const idAccount = req.params.idAccount;

  Account.findByPk(idAccount)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Account with idAccount=${idAccount}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error retrieving Account with id=' + idAccount,
      });
    });
};

// Update a Account by the id in the request
const update = (req, res) => {
  const idAccount = req.params.idAccount;

  Account.update(req.body, {
    where: { idAccount: idAccount },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Account was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Account with id=${idAccount}. Maybe Account was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error updating Account with id=' + idAccount,
      });
    });
};

// Delete a Account with the specified id in the request
const remove = (req, res) => {
  const idAccount = req.params.idAccount;

  Account.destroy({
    where: { idAccount: idAccount },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Account was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Account with id=${idAccount}. Maybe Account was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Could not delete Account with id=' + idAccount,
      });
    });
};

module.exports = { create, findAll, findOne, update, remove };
