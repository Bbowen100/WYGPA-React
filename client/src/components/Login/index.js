import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {authSuccess, authFail} from '../../actions';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

class Login extends Component {

  componentDidMount() {
    // use axios to get data before component loads
    if(this.props.state.isAuthenticated){
      this.props.dispatch(push('/dashboard'));
    }
  }

  login(e){
    e.preventDefault();
    let {l_user, l_pass} = this.refs;
    axios.post('/users/login/', {user: l_user.value, password: l_pass.value})
    .then((res)=>{
      if(res.data.bool){
        const token  = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        var {user} = jwt.decode(token);
        this.props.dispatch(authSuccess(user));
        this.props.dispatch(push('/dashboard'));
      }else{
        this.props.dispatch(authFail());
      }
    })
  }

  signup(e){
    e.preventDefault();
    console.log('got into the signup method')
    let {s_user, s_pass} = this.refs;
    axios.post('/users/signup/', {user: s_user.value, password: s_pass.value})
    .then((res)=>{console.log(res.data)})
  }
  render() {
    return (
      <div>

        <form onSubmit={ this.login.bind(this) }>
          <h1> Login </h1>
          <input type="text" placeholder="username" ref="l_user"/><br/>
          <input type="password"  placeholder="password" ref="l_pass"/><br/>
          <Button type="submit" size="sm" color="info">Login</Button>
        </form>

        <form onSubmit={ this.signup.bind(this) }>
          <h1> Sign Up </h1>
          <input type="text" placeholder="username" ref="s_user"/><br/>
          <input type="password"  placeholder="password" ref="s_pass"/><br/>
          <Button type="submit" size="sm" color="info"> Sign Up </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props)=>{
  return {state: state.auth};
};
const mapDispatchToProps = (dispatch, props)=>{
  return {dispatch};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
