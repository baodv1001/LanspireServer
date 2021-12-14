const { ClassTime, TimeFrame } = require('../models');

//Create multi timeFrame
const createTimeFrames = async (req, res) => {
  try {
    const data = await TimeFrame.bulkCreate(req.body, { returning: true });
    res.status(200).send(data);
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || 'Some error occurred while retrieving timeFrame.' });
  }
};
// Retrieve all timeFrame from the database.
const findAll = (req, res) => {
  TimeFrame.findAll({
    include: [
      {
        model: ClassTime,
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving timeFrame.',
      });
    });
};

// Find a single timeFrame with an id
const findOne = (req, res) => {
  const idTimeFrame = req.params.idTimeFrame;

  TimeFrame.findByPk(idTimeFrame, {
    include: [
      {
        model: ClassTime,
      },
    ],
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find TimeFrame with idTimeFrame=${idTimeFrame}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving TimeFrame with idTimeFrame=' + idTimeFrame,
      });
    });
};

// Update a TimeFrame by the id in the request
const update = async (req, res) => {
  try {
    const idTimeFrame = req.params.idTimeFrame;

    const data = await TimeFrame.update(req.body, {
      where: { idTimeFrame: idTimeFrame },
      returning: true,
    });
    res.status(200).send(data[1][0]);
  } catch (err) {
    res.status(500).send({
      message: err || 'Error updating TimeFrame',
    });
  }
};

const updateAll = async (req, res) => {
  try {
    const timeFrames = req.body;
    timeFrames.map(timeFrame => {
      TimeFrame.update(
        { activate: timeFrame.activate },
        {
          where: { idTimeFrame: timeFrame.idTimeFrame },
        }
      );
    });
    res.status(200).send('Update all time frame successfully');
  } catch (err) {
    res.status(500).send({
      message: err || 'Error updating TimeFrame',
    });
  }
};

// Delete a TimeFrame with the specified id in the request
const remove = (req, res) => {
  const idTimeFrame = req.params.idTimeFrame;

  TimeFrame.destroy({
    where: { idTimeFrame: idTimeFrame },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'TimeFrame was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete TimeFrame with idTimeFrame=${idTimeFrame}. Maybe TimeFrame was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete TimeFrame with idTimeFrame=' + idTimeFrame,
      });
    });
};
module.exports = { findOne, findAll, update, remove, createTimeFrames, updateAll };
