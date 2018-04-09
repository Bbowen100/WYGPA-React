import React, { Component } from 'react';
import { Button, TextField } from 'material-ui';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { authSuccess, authFail } from '../../actions';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import './style.css';

class Login extends Component {
  componentDidMount() {
    if (this.props.state.isAuthenticated)
      this.props.dispatch(push('/dashboard'));
  }

  login = e => {
    e.preventDefault();
    const err = this.validateLogin();
    if (!err) {
      const { l_user, l_pass } = this.state;
      axios
        .post('/users/login/', { user: l_user, password: l_pass })
        .then(res => {
          if (res.data.bool) {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            let { user } = jwt.decode(token);
            this.props.dispatch(authSuccess(user));
            this.props.dispatch(push('/dashboard'));
          } else {
            this.props.dispatch(authFail());
          }
        });
    }
  };

  signup = e => {
    e.preventDefault();
    const err = this.validateSignUp();
    if (!err) {
      const { s_user, s_pass } = this.state;
      axios
        .post('/users/signup/', { user: s_user, password: s_pass })
        .then(res => {
          console.log(res.data);
        });
    }
  };

  validateLogin = () => {
    const { l_user, l_pass } = this.state;
    let isError = false;
    if (l_user.trim().length < 4) {
      this.setState({ l_userError: true });
      isError = true;
    } else {
      this.setState({ l_userError: false });
    }

    if (l_pass.trim().length < 5) {
      this.setState({ l_passError: true });
      isError = true;
    } else {
      this.setState({ l_passError: false });
    }

    return isError;
  };

  validateSignUp = () => {
    const { s_user, s_pass } = this.state;
    let isError = false;
    if (s_user.trim().length < 4) {
      this.setState({ s_userError: true });
      isError = true;
    } else {
      this.setState({ s_userError: false });
    }
    if (s_pass.trim().length < 5) {
      this.setState({ s_passError: true });
      isError = true;
    } else {
      this.setState({ s_passError: false });
    }
    return isError;
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  state = {
    l_user: '',
    l_pass: '',
    s_user: '',
    s_pass: '',
    l_userError: false,
    l_passError: false,
    s_userError: false,
    s_passError: false
  };

  render() {
    return (
      <div className="formStyle">
        <form className="boxStyle" onSubmit={this.login.bind(this)}>
          <h1> Login </h1>
          <TextField
            name="l_user"
            label="Username"
            value={this.state.l_user}
            onChange={this.handleChange}
            error={this.state.l_userError}
            margin="normal"
          />
          <br />
          <TextField
            type="password"
            name="l_pass"
            label="Password"
            value={this.state.l_pass}
            onChange={this.handleChange}
            error={this.state.l_passError}
            margin="normal"
          />
          <br />
          <Button type="submit" size="medium" color="primary">
            Login
          </Button>
        </form>

        <form className="boxStyle" onSubmit={this.signup.bind(this)}>
          <h1> Sign Up </h1>
          <TextField
            name="s_user"
            label="Username"
            value={this.state.s_user}
            onChange={this.handleChange}
            error={this.state.s_userError}
            margin="normal"
          />
          <br />
          <TextField
            type="password"
            name="s_pass"
            label="Password"
            value={this.state.s_pass}
            onChange={this.handleChange}
            error={this.state.s_passError}
            margin="normal"
          />
          <br />
          <Button type="submit" size="medium" color="primary">
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { state: state.auth };
};
const mapDispatchToProps = (dispatch, props) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
