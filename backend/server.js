const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const registrationRoute = require('./routes/registration');
const checkinRoute = require('./routes/checkin');
const studentsRoute = require('./routes/students');

const cors = require('cors');
const cron = require('node-cron');
const Checkin = require('./models/Checkin'); 
require('dotenv').config();
const xlsx = require('xlsx');


const path = require('path');
const Student = require('./models/Student');
const app = express();
const PORT = process.env.PORT;
const mongoURL = process.env.MONGO_URI

app.use(bodyParser.json());
app.use(cors());


mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("databse connection established")
}).catch((err)=> {
  console.error("Error connecting to database: ", err);
  process.exit(); 
});

/*

app.post('/api/students', async (req, res) => {
  try {
    const students = req.body.data;
    if (!students || !Array.isArray(students)) {
      return res.status(400).send('Invalid data format');
    }

    for (const student of students) {
      // Skip empty rows
      if (!student[0]) continue;

      const [name, rollNo, year, hostel, slot, count] = student;
      await Student.updateOne(
        { rollNo },
        { $set: { name, hostel, year, slot, count: Number(count) } },
        { upsert: true } // Create a new document if it doesn't exist
      );
    }

    res.status(200).send('Data saved successfully!');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});*/

/*
app.get('/import', async (req, res) => {
  try {
    const filePath = 'D:/Users/jatyo/Downloads/students.xlsx';
    console.log(`Reading file from: ${filePath}`);

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

   

   
    const rollNosFromExcel = data.map(record => record.rollNo);

    
    const existingStudents = await Student.find({});
    const existingRollNos = existingStudents.map(student => student.rollNo);

    
    const rollNosToDelete = existingRollNos.filter(rollNo => !rollNosFromExcel.includes(rollNo));
    
    if (rollNosToDelete.length > 0) {
      await Student.deleteMany({ rollNo: { $in: rollNosToDelete } });
      console.log('Deleted records with rollNos:', rollNosToDelete);
    }

    
    for (let record of data) {
      console.log('Processing record:', record); 

      
      const existingStudent = await Student.findOne({ rollNo: record.rollNo });

      if (!existingStudent) {
        
        const newStudent = new Student({
          rollNo: record.rollNo,
          name: record.name,
          hostel: record.hostel,
          year: record.year,
          slot: record.slot,
        });

        await newStudent.save();
        console.log('Saved new record:', record); 
      } else {
       
        existingStudent.name = record.name;
        existingStudent.hostel = record.hostel;
        existingStudent.year = record.year;
        existingStudent.slot = record.slot;

        await existingStudent.save();
        console.log('Updated existing record:', record);
      }
    }

    res.send('Data imported and synchronized successfully from students.xlsx');
  } catch (error) {
    console.error('Error during import:', error);
    res.status(500).send('Error importing data');
  }
});
*/

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find({}).sort({ count: -1 }); 
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Error fetching students');
  }
});


app.use('/api', registrationRoute);
app.use('/api', checkinRoute);
app.use('/api', studentsRoute);



cron.schedule('0 0 * * *', async () => {
  try {
    await Checkin.deleteMany({}); 
    console.log('All check-ins deleted successfully');
  } catch (error) {
    console.error('Error deleting check-ins:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
