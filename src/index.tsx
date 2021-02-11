import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import  'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import { MainManu, MainManuItem } from './components/mainManu/MainManu';
import {  HashRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import COntactPage from './components/ContactPage/contactPage';
import UserLogin from './components/userLogin/userLoginPage';



const manuItems = [
  new MainManuItem("home","/" ),
  new MainManuItem("Contact","/contact/" ),
  new MainManuItem("Log in","/user/login/" ),
];


ReactDOM.render(
  <React.StrictMode>
    <MainManu items={manuItems}></MainManu>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route  path="/contact/" component={COntactPage}/>
        <Route  path="/user/login/" component={UserLogin}/>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')

);
reportWebVitals(); 


