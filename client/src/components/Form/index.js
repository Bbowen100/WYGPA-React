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
    mark: ''
  };

  Submit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', weight: '', mark: '' });
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
          margin="normal"
        />

        <TextField
          name="weight"
          label="Weight"
          className={classes.textField}
          value={this.state.weight}
          onChange={this.handleChange}
          margin="normal"
        />
        {complete && (
          <TextField
            name="mark"
            label="Mark"
            className={classes.textField}
            value={this.state.mark}
            onChange={this.handleChange}
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
const validate = values => {};

Form.propTypes = {
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(Form);
