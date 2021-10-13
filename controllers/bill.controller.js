const db = require("../models");
const Bill = db.Bill;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.idbill) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Bill
    const bill = {
      idbill: req.body.idbill,
      idaccount: req.body.idaccount,
      idstudent: req.body.idstudent,
      createddate: req.body.createddate,
      totalfee: req.body.totalfee
    }
    // Save Bill in the database
    Bill.create(bill)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Bill."
        });
      });
  };
  
  // Retrieve all Bill from the database.
  exports.findAll = (req, res) => {
  
    Bill.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving bill."
        });
      });
  };
  
  // Find a single Bill with an id
  exports.findOne = (req, res) => {
    const idBill = req.params.id;
  
    Bill.findByPk(idBill)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Bill with idBill=${idBill}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Bill with id=" + idBill
        });
      });
  };
  
  // Update a Bill by the id in the request
  exports.update = (req, res) => {
    const idBill = req.params.id;
  
    Bill.update(req.body, {
      where: { idbill: idBill }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Bill was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Bill with id=${idBill}. Maybe Bill was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Bill with id=" + idBill
        });
      });
  };
  
  // Delete a Bill with the specified id in the request
  exports.delete = (req, res) => {
    const idBill = req.params.id;
  
    Bill.destroy({
      where: { idbill: idBill }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Bill was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Bill with id=${idBill}. Maybe Bill was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Bill with id=" + idBill
        });
      });
  };
  
  
  // find all published Bill
  exports.findByIdAccount = (req, res) => {
    Bill.findAll({ where: { idaccount: req.body.idaccount } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving bill."
        });
      });
  };