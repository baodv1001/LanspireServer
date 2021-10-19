const db = require('../models');
const Exam = db.Exam;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Exam
  const exam = {
    nameOfExam: req.body.nameOfExam,
    fileUrl: req.body.fileUrl,
    postedDate: req.body.postedDate,
    idTypeOfTest: req.body.idTypeOfTest,
    idColumn: req.body.idColumn,
  };
  // Save Exam in the database
  Exam.create(exam)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Exam.',
      });
    });
};

// Retrieve all Exam from the database.
exports.findAll = (req, res) => {
  Exam.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Exam.',
      });
    });
};

// Find a single Exam with an id
exports.findOne = (req, res) => {
  const idExam = req.params.idExam;

  Exam.findOne({ where: { idExam: idExam } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Bill.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Exam',
      });
    });
};

// Update a Exam by the id in the request
exports.update = (req, res) => {
  const idExam = req.params.idExam;

  Exam.update(req.body, {
    where: { idExam: idExam },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Exam was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Exam. Maybe Exam was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Exam',
      });
    });
};

// Delete a exam with the specified id in the request
exports.delete = (req, res) => {
  const idExam = req.params.idExam;

  Exam.destroy({
    where: { idExam: idExam },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Exam was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Exam. Maybe Exam was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Exam',
      });
    });
};
