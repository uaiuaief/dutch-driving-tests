import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


window.getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie != '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

window.fetchProfile = async () => {
  let res = await fetch('/api/get-profile/')

  if (String(res.status).slice(0, 1) === '2') {
    let user = await res.json()
    return user
  }
  else {
    return null
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
