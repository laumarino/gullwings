import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class DiagnosisSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      diagnoses: [],
      symptomSubmitted : false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

};