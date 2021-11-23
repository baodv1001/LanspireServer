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
    testTime: req.body.testTime,
    testDate: req.body.testDate,
    idClass: req.body.idClass,
    idTestType: req.body.idTestType,
    idColumn: req.body.idColumn,
  };
  // Save Exam in the database
  Exam.create(exam)
    .then(data => {
      Exam.findByPk(data.idExam, {
        include: [
          {
            model: TestType,
          },
          {
            model: Column_Transcript,
            as: 'Columns',
          },
        ],
      }).then(data => {
        res.send(data);
      });
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
        as: 'Columns',
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
        as: 'Columns',
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

// Find Exam by idClass
const findByIdClass = (req, res) => {
  const idClass = req.params.idClass;

  Exam.findAll({
    where: {
      idClass: idClass,
    },
    include: [
      {
        model: TestType,
      },
      {
        model: Column_Transcript,
        as: 'Columns',
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

// Update a Exam by the id in the request
const update = (req, res) => {
  const idExam = req.params.idExam;

  Exam.update(req.body, {
    where: { idExam: idExam },
  })
    .then(num => {
      if (num == 1) {
        Exam.findOne({
          where: {
            idExam: idExam,
          },
          include: [
            {
              model: TestType,
            },
            {
              model: Column_Transcript,
              as: 'Columns',
            },
          ],
        }).then(data => res.send(data));
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

module.exports = { create, findAll, findOne, update, remove, findByIdClass };
