import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography } from 'material-ui';
import './style.css';

class DesiredAverage extends Component {
  state = {
    desiredAvg: '',
    neededAvg: 0,
    remWeight: '',
    desiredAvgError: false,
    remWeightError: false,
    neededAvgError: false
  };

  calcDesiredAverage(e) {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      let desiredAvg = Number(this.state.desiredAvg);
      let remWeight = Number(this.state.remWeight);
      let weight = this.props.items
        .map(ele => ele.weight)
        .reduce((acc, val) => acc + val);
      let totMarks = this.props.items
        .map(ele => ele.weight * ele.mark)
        .reduce((acc, val) => {
          return acc + val;
        });
      let accumWeight = weight + remWeight;
      let needed = (desiredAvg * accumWeight - totMarks) / remWeight;
      this.setState({ neededAvg: needed }, function() {
        this.validateNeededAvg();
      });
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  validate() {
    const { desiredAvg, remWeight } = this.state;
    let isError = false;
    if (isNaN(Number(desiredAvg)) || desiredAvg.trim().length < 1) {
      this.setState({ desiredAvgError: true });
      isError = true;
    } else {
      this.setState({ desiredAvgError: false });
    }

    if (isNaN(Number(remWeight)) || remWeight.trim().length < 1) {
      this.setState({ remWeightError: true });
      isError = true;
    } else {
      this.setState({ remWeightError: false });
    }

    return isError;
  }
  validateNeededAvg() {
    const { neededAvg } = this.state;
    if (Number(neededAvg) < 0 || Number(neededAvg) > 100) {
      this.setState({ neededAvgError: true });
    } else {
      this.setState({ neededAvgError: false });
    }
  }

  render() {
    return (
      <div className="body">
        <Typography variant="headline">Desired Average</Typography>
        <form onSubmit={this.calcDesiredAverage.bind(this)}>
          <TextField
            name="desiredAvg"
            label="Desired Average"
            value={this.state.desiredAvg}
            onChange={this.handleChange}
            error={this.state.desiredAvgError}
            margin="normal"
          />
          <br />
          <TextField
            name="remWeight"
            label="Remaining Weight"
            value={this.state.remWeight}
            onChange={this.handleChange}
            error={this.state.remWeightError}
            margin="normal"
          />
          <br />
          <Button type="submit">Submit</Button>
        </form>
        {!this.state.neededAvgError && (
          <Typography variant="subheading">
            To get <b>{this.state.desiredAvg}</b> you will need to get
            <b>{' ' + this.state.neededAvg.toFixed(2)}</b> over your remaining
            assignments
          </Typography>
        )}
        {this.state.neededAvgError && (
          <Typography variant="subheading">
            It is not possible to get this mark
          </Typography>
        )}
      </div>
    );
  }
}

DesiredAverage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};

export default DesiredAverage;
