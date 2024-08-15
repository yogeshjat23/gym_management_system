import React, { useEffect, useState } from 'react';
import { useCheckin } from '../contexts/CheckinContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import axios from "axios";

const Dashboard = () => {
  const [checkins, setcheckin] = useState([]);
  // connect to 
  async function fetchCheckins() {
    await axios.get("http://localhost:5000/api/checkins")
     .then((response) => {
       console.log(response.data);
       setcheckin(response.data);
      })
     .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchCheckins();
  }, []);


  return (
    <div className="dashboard-container">
      <h1>Check-In Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Slot</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
          </tr>
        </thead>
        <tbody>
          {checkins.length > 0 ? ( 
            (checkins).map((checkin) => {
              return <tr key={checkin.rollNo}>
                <td>{checkin.rollNo}</td>
                <td>{checkin.slot}</td>
                <td>{checkin.checkIn}</td>
                <td>{checkin.checkOut || 'Not Checked Out'}</td>
              </tr>})): <tr><td colSpan="4">No entries</td></tr>}
        </tbody>
      </table>
      <nav>
        <Link to="/">Go to Home</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
