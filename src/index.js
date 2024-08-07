import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SpaContents from './SpaContents';

const root = ReactDOM.createRoot(document.getElementById("singlePageAppContents"));
root.render(
  <React.StrictMode>
    <SpaContents />
  </React.StrictMode>
);