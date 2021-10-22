const { Column_Transcript } = require('../models');

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a new object
  const newObj = {
    nameOfColumn: req.body.nameOfColumn,
    min: req.body.min,
    max: req.body.max,
  };
  // Save
  Column_Transcript.create(newObj)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Column_Transcript.',
      });
    });
};

// Retrieve all.
const findAll = (req, res) => {
  Column_Transcript.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Column_Transcript.',
      });
    });
};

// Find with an id
const findOne = (req, res) => {
  const idColumn = req.params.idColumn;

  Column_Transcript.findByPk(idColumn)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find Column_Transcript',
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Column_Transcript',
      });
    });
};

// Update  by the id in the request
const update = (req, res) => {
  const idColumn = req.params.idColumn;

  Column_Transcript.update(req.body, {
    where: { idColumn: idColumn },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Column_Transcript was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Column_Transcript . Maybe Column_Transcript was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Column_Transcript',
      });
    });
};

// Delete a Column_Transcript with the specified id in the request
const remove = (req, res) => {
  const idColumn = req.params.idColumn;

  Column_Transcript.destroy({
    where: { idColumn: idColumn },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Column_Transcript was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Column_Transcript. Maybe Column_Transcript was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Column_Transcript',
      });
    });
};

module.exports = { create, update, findAll, findOne, remove };
