import React from 'react';

function CheckOut() {
  const handleCheckOut = () => {
    console.log('Checked out');
  };

  return (
    <div>
      <h3>Check Out</h3>
      <button onClick={handleCheckOut}>Check Out</button>
    </div>
  );
}

export default CheckOut;
