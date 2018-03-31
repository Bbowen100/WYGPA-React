import React, { Component } from 'react';

class Form extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Field name="location" component={this.locationInput} />
        <br />
        <Button fluid type="submit">
          Submit
        </Button>
      </form>
    );
  }
}
const validate = values => {};

export default Form;
