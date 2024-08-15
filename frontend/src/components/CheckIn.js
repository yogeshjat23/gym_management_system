import React from 'react';

function CheckIn() {
  const handleCheckIn = () => {
    console.log('Checked in');
  };

  return (
    <div>
      <h3>Check In</h3>
      <button onClick={handleCheckIn}>Check In</button>
    </div>
  );
}

export default CheckIn;
