import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { Provider } from 'react-redux'; 
import fontAwesome from '../src/assets/font-awesome/scss/font-awesome.scss'; 
import configureStore from './store/configureStore';
import styles from './base.scss';
 
const store = configureStore(); 

ReactDOM.render(
  <Provider store={store}>
    <Routes/>
  </Provider>, 
  document.getElementById("root")
);
