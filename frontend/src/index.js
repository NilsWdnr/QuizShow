import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/style.scss';
import App from './App';

import { UserProvider, UserContext } from './context/UserProvider';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
        <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

