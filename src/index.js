import React from 'react';
import ReactDOM from 'react-dom/client';
import  App  from 'components/App';
import API from './components/API/API'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App API={API}/>
  </React.StrictMode>
);
