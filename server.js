const express = require("express");
const cors = require("cors");
const db = require("./models");

const centerRoute = require("./routes/center.route");

const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

// routes
require("./routes/center.route.js")(app);
require("./routes/attendance.route.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
