// src/pages/Registration.js
import React, { useEffect, useState } from 'react';
import { useCheckin } from '../contexts/CheckinContext';
import { useTranslation } from 'react-i18next';
import './Registration.css';
import axios from 'axios';

const Registration = () => {
  const { t } = useTranslation();
  const { checkins, setCheckins } = useCheckin();
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [hostel, setHostel] = useState('');
  const [year, setYear] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [message, setMessage] = useState('');

  const slots = {
    'slot1': { start: '11:00', end: '12:00', capacity: 50 },
    'slot2': { start: '17:00', end: '01:00', capacity: 50 },
    'slot3': { start: '07:00', end: '08:00', capacity: 50 },
    'slot4': { start: '08:00', end: '09:00', capacity: 50 },
    'slot5': { start: '17:00', end: '18:00', capacity: 50 },
    'slot6': { start: '18:00', end: '19:00', capacity: 50 },
    'slot7': { start: '19:00', end: '20:00', capacity: 50 },
    'slot8': { start: '20:00', end: '21:00', capacity: 50 },
  };

  async function register(name, rollNo, hostel, year, selectedSlot){
    try{
      await axios.post("http://localhost:5000/api/register", {name, rollNo, hostel, year, slot: selectedSlot})
      .then((response) =>{
        console.log(response.data);
        setMessage(t(response.data.message));
      })
      .catch((err) =>{
        console.error(err.response.data);
        setMessage(t(err.response.data.message));
      });
    }
    catch(error){
      console.error(error);
    }
  }

  const getAvailableSlots = () => {
    const slotCounts = {};

    Object.values(checkins).forEach(({ slot }) => {
      slotCounts[slot] = (slotCounts[slot] || 0) + 1;
    });

    return Object.entries(slots).filter(([slot, { capacity }]) => {
      return !slotCounts[slot] || slotCounts[slot] < capacity;
    });
  };

  const handleRegistration = () => {
    if (!name || !rollNo || !hostel || !year || !selectedSlot) {
      setMessage(t('Please fill all fields'));
      return;
    }

    if (checkins[rollNo]) {
      setMessage(t('Already registered')); 
    } else {
      register(name, rollNo, hostel, year, selectedSlot);
      const newCheckins = {
        ...checkins,
        [rollNo]: { name, hostel, year, slot: selectedSlot, checkIn: null, checkOut: null },
      };
      setCheckins(newCheckins);
      setMessage(t('Registration successful')); 
      
      // Clear the inputs
      setName('');
      setRollNo('');
      setHostel('');
      setYear('');
      setSelectedSlot('');
    }
  };

  return (
    <div className="registration-container">
      <h1>{t('New Registration')}</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t('Enter_Name')}
      />
      <input
        type="text"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        placeholder={t('Enter_Roll_Number')}
      />
      <input
        type="text"
        value={hostel}
        onChange={(e) => setHostel(e.target.value)}
        placeholder={t('Enter_Hostel_Name')}
      />
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">{t('select_year')}</option>
        <option value="btech1">{t('Btech1')}</option>
        <option value="btech2">{t('Btech2')}</option>
        <option value="btech3">{t('Btech3')}</option>
        <option value="btech4">{t('Btech4')}</option>
        <option value="mtech1">{t('Mtech1')}</option>
        <option value="mtech2">{t('Mtech2')}</option>
        <option value="phd">{t('PHD')}</option>
      </select>
      <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
        <option value="">{t('select_slot')}</option>
        {getAvailableSlots().map(([slot, { start, end }]) => (
          <option key={slot} value={slot}>{`${t(slot)} (${start} - ${end})`}</option>
        ))}
      </select>
      <button onClick={handleRegistration}>{t('Register')}</button>
      <p>{message}</p>
    </div>
  );
};

export default Registration;
