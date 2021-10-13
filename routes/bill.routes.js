module.exports = app => {
    const bill = require("../controllers/bill.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Bill
    router.post("/", bill.create);
  
    // Retrieve all Bill
    router.get("/", bill.findAll);
  
    // Retrieve a single Bill with id
    router.get("/:id", bill.findOne);
  
    // Update a Bill with id
    router.put("/:id", bill.update);
  
    // Delete a Bill with id
    router.delete("/:id", bill.delete);
  
    app.use("/api/bills", router);
  };