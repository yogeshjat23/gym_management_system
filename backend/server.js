const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const registrationRoute = require('./routes/registration');
const checkinRoute = require('./routes/checkin');
const studentsRoute = require('./routes/students');
const cors = require('cors');


const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/gym', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("databse connection established")
}).catch((err)=> {
  console.error("Error connecting to database: ", err);
  process.exit();  // Exit the process with an error
});


app.use('/api', registrationRoute);
app.use('/api', checkinRoute);
app.use('/api', studentsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
