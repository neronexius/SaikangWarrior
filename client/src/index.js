import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./styles/login.scss"
import "./styles/register.scss"
import "./styles/nav.css"
import "./styles/cart.scss"
import "./styles/home.scss"
import "./styles/search.scss"
import "./styles/requestpage.scss"
import "./styles/task.scss"
import "./styles/post.scss"
import "./styles/welcome.scss"
 // You can also use <link> for styles
// ..



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
