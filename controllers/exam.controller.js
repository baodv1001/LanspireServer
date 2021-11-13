const { Exam, TestType, Column_Transcript } = require('../models');

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Exam
  const exam = {
    examName: req.body.examName,
    fileUrl: req.body.fileUrl,
    postedDate: req.body.postedDate,
    idClass: req.body.idClass,
    idTestType: req.body.idTestType,
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
const findAll = (req, res) => {
  Exam.findAll({
    include: [
      {
        model: TestType,
      },
      {
        model: Column_Transcript,
      },
    ],
  })
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
const findOne = (req, res) => {
  const idExam = req.params.idExam;

  Exam.findByPk(idExam, {
    include: [
      {
        model: TestType,
      },
      {
        model: Column_Transcript,
      },
    ],
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Exam.`,
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
const update = (req, res) => {
  const idExam = req.params.idExam;

  Exam.update(req.body, {
    where: { idExam: idExam },
    include: [
      {
        model: TestType,
      },
      {
        model: Column_Transcript,
      },
    ],
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
const remove = (req, res) => {
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

module.exports = { create, findAll, findOne, update, remove };
