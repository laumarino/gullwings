import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class SymptomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      symptoms: [],
      symptomSubmitted : false,
      likelyDiagnosis : "",
      confirmValue: "",
      diagConfirmed : false,
      diagnoses : [],
      diagDenied : false,
      diagValue: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirmSubmit = this.handleConfirmSubmit.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
    this.handleResetSubmit = this.handleResetSubmit.bind(this);
    this.handleDiagSubmit = this.handleDiagSubmit.bind(this);
    this.handleDiagChange = this.handleDiagChange.bind(this);
  }

  componentDidMount() {
    this.getSymptoms();
  }

  getSymptoms = () => {
    axios.get(API_URL).then(res => this.setState({ symptoms: res.data }));
  };

  getDiagnoses = () => {
    axios.get(API_URL + 'symptoms/' + this.state.value).then(res => this.setState({ diagnoses: res.data}))
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
    this.setState({value: event.target.value})
  };

  handleSubmit(event) {
    event.preventDefault();
    axios.get(API_URL + 'symptoms/' + this.state.value + '/diagnose', this.state).then(res => {
      this.setState({symptomSubmitted: true})
      this.setState({likelyDiagnosis: res.data})
    });
  };

  handleConfirmChange(event){
    this.setState({ [event.target.name]: event.target.value });
    this.setState({confirmValue: event.target.value});
  }

  handleConfirmSubmit(event) {
    event.preventDefault();
    this.getDiagnoses();
    if (this.state.confirmValue == "yes") {
      this.state.likelyDiagnosis.frequency = this.state.likelyDiagnosis.frequency + 1
      axios.put(API_URL + 'diagnoses/' + this.state.likelyDiagnosis.id, this.state.likelyDiagnosis).then(() => {
        this.setState({diagConfirmed: true})
      });
    }
    if (this.state.confirmValue == "no") {
      this.setState({diagDenied: true});
    }
  }

  handleDiagChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({diagValue: event.target.value});
  }

  handleDiagSubmit(event) {
    event.preventDefault();
    axios.get(API_URL + 'diagnoses/' + this.state.diagValue).then(res => {
      this.setState({likelyDiagnosis: res.data})
      this.state.likelyDiagnosis.frequency = this.state.likelyDiagnosis.frequency + 1
      axios.put(API_URL + 'diagnoses/' + this.state.diagValue, this.state.likelyDiagnosis).then(() => {
        this.setState({diagConfirmed: true})
      });
    });
  }

  handleResetSubmit(event) {
    event.preventDefault();
    this.setState({
      value: '',
      symptomSubmitted : false,
      likelyDiagnosis : "",
      confirmValue: "",
      diagConfirmed : false,
      diagnoses : [],
      diagDenied : false,
      diagValue: ''
    });
  }

  render() {
    return (
      <div>
        {!this.state.symptomSubmitted &&
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="symptomSelect">Choose your symptom</Label>
              <Input type="select" name="symptom" id="symptomSelect" value={this.state.value} onChange={this.handleChange}>
                {this.state.symptoms.map((symptom) => <option key={symptom.id} value={symptom.id}>{symptom.name}</option>)}
              </Input>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        }
        {this.state.symptomSubmitted && !this.state.diagConfirmed && !this.state.diagDenied &&
          <div>
            Your most likely diagnosis is {this.state.likelyDiagnosis.name}.
            <Form onSubmit={this.handleConfirmSubmit}>
              <FormGroup>
                <Label for="diagConfirm">Do you have {this.state.likelyDiagnosis.name}?</Label>
                <Input type="select" name="diagConfirm" id="diagConfirm" value={this.state.confirmValue} onChange={this.handleConfirmChange}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Input>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
           </div>
        }
        {this.state.diagDenied && !this.state.diagConfirmed &&
          <div>
            <Form onSubmit={this.handleDiagSubmit}>
              <FormGroup>
                <Label for="diagSelect">Please select the most accurate diagnosis</Label>
                <Input type="select" name="diagnosis" id="diagSelect" value={this.state.diagValue} onChange={this.handleDiagChange}>
                  {this.state.diagnoses.map((diagnosis) => <option key={diagnosis.id} value={diagnosis.id}>{diagnosis.name}</option>)}
                </Input>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </div>
        }
        {this.state.diagConfirmed &&
          <div>
            'Thank you for confirming your diagnosis.  Here is a list of diagnoses and their frequencies for your symptom'
            {this.state.diagnoses.map((diagnosis) => (
              <tr key={diagnosis.id}>
                <td>{diagnosis.name}</td>
                <td>{diagnosis.frequency}</td>
              </tr>
            ))};
            <Form onSubmit={this.handleResetSubmit}>
              <Button>Start Over</Button>
            </Form>
          </div>
        }
      </div>



    );
  }
}

export default SymptomSelect;
