import React, { useState } from 'react';

function SlotBooking() {
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleBooking = () => {
    console.log('Slot booked:', selectedSlot);
  };

  return (
    <div>
      <h3>Book a Slot</h3>
      <select
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
      >
        <option value="">Select a time slot</option>
        <option value="5-6 AM">5-6 AM</option>
        <option value="6-7 AM">6-7 AM</option>
        <option value="7-8 AM">7-8 AM</option>
        <option value="8-9 AM">8-9 AM</option>
        <option value="5-6 PM">5-6 PM</option>
        <option value="6-7 PM">6-7 PM</option>
        <option value="7-8 PM">7-8 PM</option>
        <option value="8-9 PM">8-9 PM</option>
      </select>
      <button onClick={handleBooking}>Book Slot</button>
    </div>
  );
}

export default SlotBooking;
