import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// import GlobalStyles from './Components/GlobalStyles';
import App from './App';
import DataProvider from './Redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  // <GlobalStyles>
  <DataProvider>
    <App />
  </DataProvider>
  // </GlobalStyles>
  //</React.StrictMode>
);
