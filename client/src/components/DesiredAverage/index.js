import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography, Paper } from 'material-ui';

class DesiredAverage extends Component {
  state = {
    desiredAverage: 0,
    neededAvg: 0,
    remWeight: null
  };

  calcDesiredAverage(e) {
    e.preventDefault();
    let desiredAvg = Number(this.refs.desiredAvg.value);
    let remWeight = Number(this.refs.remWeight.value);
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
    this.setState({ neededAvg: needed });
    this.setState({ desiredAverage: desiredAvg });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  validate() {}

  render() {
    return (
      <div>
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
        <Typography variant="textSecondary">
          To get {this.state.desiredAverage} you will need to get
          {this.state.neededAvg.toFixed(2)} over your remaining assignments
        </Typography>
      </div>
    );
  }
}

DesiredAverage.PropTypes = {
  items: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string,
        weight: PropTypes.number.isRequired,
        mark: PropTypes.number.isRequired
      })
    )
  )
};

export default DesiredAverage;
