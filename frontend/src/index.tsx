import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Check if authentication is valid
fetch("/checkAuth")
  .then(response => {
    if (response.redirected) {
      window.location.replace(response.url);
    }
    else {
      ReactDOM.render(<App/>, document.getElementById('root'));
    }
  })
  .catch(e => {
    window.location.replace('/login');
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
