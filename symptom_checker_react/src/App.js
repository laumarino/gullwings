import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import SymptomSelect from './components/SymptomSelect'
import axios from "axios";
import { API_URL } from "./constants";

class App extends Component {

  render() {
    return (
      <SymptomSelect />
    );
  }
}

export default App;
