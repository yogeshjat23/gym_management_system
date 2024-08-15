import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CheckinProvider } from './contexts/CheckinContext';


ReactDOM.render(
  <CheckinProvider>
    <App />
  </CheckinProvider>,
  document.getElementById('root')
);