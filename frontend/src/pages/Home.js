import React, { useEffect, useState } from 'react';
import { useCheckin } from '../contexts/CheckinContext';
import { Link } from 'react-router-dom';
import axios from "axios";

import './Home.css'; 


const slotAssignments = {
  'slot1': ['22bec116', '22bec115'],
  'slot2': ['22bec114', '22bec113'],
  'slot3': ['22bee005', '22bee006'],
  'slot4': ['roll7', 'roll8'],
  'slot5': ['22bec112', '22bec111'],
  'slot6': ['roll11', 'roll12'],
  'slot7': ['roll13', 'roll14'],
  'slot8': ['roll15', 'roll16'],
};

const slots = {
  'slot1': { start: '11:00', end: '12:00' },
  'slot2': { start: '06:00', end: '07:00' },
  'slot3': { start: '07:00', end: '08:00' },
  'slot4': { start: '08:00', end: '09:00' },
  'slot5': { start: '17:00', end: '18:00' },
  'slot6': { start: '18:00', end: '19:00' },
  'slot7': { start: '19:00', end: '20:00' },
  'slot8': { start: '20:00', end: '21:00' },
};

const HomePage = () => {
   
  const { checkins, setCheckins } = useCheckin();
  const [rollNo, setRollNo] = useState('');
  const [message, setMessage] = useState('');

  // send request to server

  async function checkin(rollNo) {
    await axios.post("http://localhost:5000/api/checkin", {rollNo})
     .then((response) => {
       console.log(response.data);
       setMessage(response.data.message);
      })
     .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
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

  const isValidSlot = (slot) => {
    const currentTime = getCurrentTimeInIST();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const slotTime = slots[slot];
    if (!slotTime) return false;

    const [startHour, startMinute] = slotTime.start.split(':').map(Number);
    const [endHour, endMinute] = slotTime.end.split(':').map(Number);

    return (
      (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
      (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute))
    );
  };

  const handleCheckIn = () => {
    const currentTime = formatDate(getCurrentTimeInIST());
    let assignedSlot = null;

    for (const [slot, rollNumbers] of Object.entries(slotAssignments)) {
      if (rollNumbers.includes(rollNo)) {
        assignedSlot = slot;
        break;
      }
    }

    if (assignedSlot) {
      if (isValidSlot(assignedSlot)) {
        if (!checkins[rollNo]) {
          const newCheckins = {
            ...checkins,
            [rollNo]: { checkIn: currentTime, slot: assignedSlot },
          };
          setCheckins(newCheckins);
          setMessage(`Checked in at ${currentTime} for slot ${assignedSlot}`);
          setRollNo(''); // Clear input field
        } else {
          setMessage('Already checked in');
        }
      } else {
        setMessage('Not the correct time for this slot');
      }
    } else {
      setMessage('Not your slot');
    }
  };

  const handleCheckOut = () => {
    const currentTime = formatDate(getCurrentTimeInIST());

    if (checkins[rollNo] && !checkins[rollNo].checkOut) {
      const newCheckins = {
        ...checkins,
        [rollNo]: { ...checkins[rollNo], checkOut: currentTime },
      };
      setCheckins(newCheckins);
      setMessage(`Checked out at ${currentTime}`);
      setRollNo(''); // Clear input field
    } else {
      setMessage('You are not checked in or already checked out');
    }
  };

  // Determine if the user is checked in
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
      {/* {canCheckIn && <button onClick={handleCheckIn}>Check In</button>}
      {canCheckOut && <button onClick={handleCheckOut}>Check Out</button>} */}
      {rollNo && <button onClick={clickHandler} >checkIn/Out</button>}
      <p>{message}</p>
      <nav>
        <Link to="/dashboard">Go to Dashboard</Link>
      </nav>
    </div>
    </div>
  );
};

export default HomePage;
