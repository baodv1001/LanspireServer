const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Langspire application.' });
  console.log(process.env.DATABASE_URL);
});

require('./routes/bill.routes.js')(app);
require('./routes/billInfo.routes.js')(app);
require('./routes/course.routes.js')(app);
require('./routes/typeOfCourse.routes.js')(app);
require('./routes/class.routes.js')(app);
require('./routes/classTime.routes.js')(app);
require('./routes/timeFrame.routes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
