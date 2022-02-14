/* Axios */
import * as axios from 'axios';
// get
axios
  .get('REQUEST_URL', { 
    /* об'єкт з налаштуваннями */ 
  })
  .then(response => {
    console.log(response);
  });
// post
axios
  .post('REQUEST_URL', {
    name: "Andrey",
    age: 22
  }, { 
    /* об'єкт з налаштуваннями */ 
  })
  .then(response => {
    console.log(response);
  });

/* Fetch */
const sendRequest = (method, url, body = null) => {
  return fetch(url, {
    method: method,
    body: body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json(); // text
      }

      return response.json().then(err => {
        const e = new Error('Щось пішло не так');
        e.data = err;
        throw e;
      });
    })
}
// get
sendRequest('GET', 'REQUEST_URL')
  .then(data => console.log(data))
  .catch(err => console.log(err));
// post
sendRequest('POST', 'REQUEST_URL', { name: "Andrey", age: 22 })
  .then(data => console.log(data))
  .catch(err => console.log(err));

/* XMLHttpRequest */
const sendRequest = (method, url, body = null) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    }
    
    xhr.onerror = () => {
      reject(xhr.response);
    }
    
    xhr.send(body);
  });
}
// get
sendRequest('GET', 'REQUEST_URL')
  .then(data => console.log(data))
  .catch(err => console.log(err));
// post
sendRequest('POST', 'REQUEST_URL', { name: "Andrey", age: 22 })
  .then(data => console.log(data))
  .catch(err => console.log(err));