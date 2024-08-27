import React, {  useState } from 'react';
import { useCheckin } from '../contexts/CheckinContext';
import { Link } from 'react-router-dom';
import axios from "axios";
import toast, { } from 'react-hot-toast';

import './Home.css'; 


const slotAssignments = {
  'slot1': [],
  'slot2': [],
  'slot3': [],
  'slot4': [],
  'slot5': [],
  'slot6': [],
  'slot7': [],
  'slot8': [],
};

const slots = {
  'slot1': { start: '05:00', end: '06:00' },
  'slot2': { start: '06:00', end: '07:00' },
  'Slot3': { start: '07:00', end: '08:00' },
  'slot4': { start: '08:00', end: '09:00' },
  'slot5': { start: '17:00', end: '18:00' },
  'slot6': { start: '18:00', end: '19:00' },
  'slot7': { start: '19:00', end: '20:00' },
  'slot8': { start: '21:00', end: '22:00' },
};

const HomePage = () => {
   
  const { checkins, setCheckins } = useCheckin();
  const [rollNo, setRollNo] = useState('');
  const [message, setMessage] = useState('');

  

  async function checkin(rollNo) {
    await axios.post("http://localhost:5000/api/checkin", {rollNo})
     .then((response) => {
       console.log(response.data);
       setMessage(response.data.message);
      
       toast.success(response.data.message);
      })
     .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        
        toast.error(error.response.data.message);
      });
  }


  const getCurrentTimeInIST = () => {
    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * 5.5));
  };

  const formatDate = (date) => {
    return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }); 
  };

  

  
  const isCheckedIn = checkins[rollNo] && !checkins[rollNo].checkOut;
  const canCheckIn = !isCheckedIn && rollNo !== '';
  const canCheckOut = isCheckedIn && rollNo !== '';
  function clickHandler(){
    checkin(rollNo);
  }

  return (
    <div className="body">
  
    <div className="home-container">
      
      <h1>Gym Check-In/Check-Out</h1>
      <input
        type="text"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        placeholder="Enter Roll Number"
      />
      
      { <button onClick={clickHandler} >Check-In/Out</button>}
      <p>{message}</p>
      
    
      
      <nav>
        <Link to="/dashboard">Go to Dashboard</Link>
      </nav>
    </div>
    </div>
  );
};


export default HomePage;
