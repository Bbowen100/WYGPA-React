import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import styles from './style';

class Form extends Component {
  state = {
    name: '',
    weight: '',
    mark: '',
    nameError: false,
    markError: false,
    weightError: false
  };

  Submit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      this.setState({
        name: '',
        weight: '',
        mark: '',
        nameError: false,
        markError: false,
        weightError: false
      });
    }
  };

  validate = () => {
    const { name, weight, mark } = this.state;
    let isError = false;
    if (name.trim().length < 1) {
      this.setState({ nameError: true });
      isError = true;
    } else {
      this.setState({ nameError: false });
    }

    if (isNaN(Number(weight))) {
      this.setState({ weightError: true });
      isError = true;
    } else {
      this.setState({ weightError: false });
    }

    if (isNaN(Number(mark)) || (Number(mark) < 0 || Number(mark) > 100)) {
      this.setState({ markError: true });
      isError = true;
    } else {
      this.setState({ markError: false });
    }
    return isError;
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes } = this.props;
    const complete = this.props.type === 'complete';
    return (
      <form onSubmit={this.Submit.bind(this)}>
        <TextField
          name="name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange}
          error={this.state.nameError}
          margin="normal"
        />

        <TextField
          name="weight"
          label="Weight"
          className={classes.textField}
          value={this.state.weight}
          onChange={this.handleChange}
          error={this.state.weightError}
          margin="normal"
        />
        {complete && (
          <TextField
            name="mark"
            label="Mark"
            className={classes.textField}
            value={this.state.mark}
            onChange={this.handleChange}
            error={this.state.markError}
            margin="normal"
          />
        )}
        <Button type="submit" size="small" color="primary">
          Submit
        </Button>
      </form>
    );
  }
}

Form.propTypes = {
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(Form);
