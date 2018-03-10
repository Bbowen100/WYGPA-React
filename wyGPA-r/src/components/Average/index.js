import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {updateAverage} from '../../actions';

class Average extends Component {
  constructor(props){
    super(props);
    this.state = {
      average: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState){
    return !(nextState.average === this.state.average);
  }

  calcAvg(source){
    let avg = 0;
    if(source.items && source.items.length > 0){
      let totMark = source.items.map((ele)=>ele.mark*ele.weight).reduce((acc, val)=>acc+val);
      let totWeight = source.items.map(ele=>ele.weight).reduce((acc, val)=>acc+val);
      avg = Number((totMark / totWeight).toFixed(2));
    }
    if(this.state.average !== avg) {
      this.setState({average: avg}, ()=>{
        this.props.dispatch(updateAverage(avg));
      });
    }
  }

  componentDidMount(){
    this.calcAvg(this.props);
  }

  componentWillReceiveProps(newProps){
    this.calcAvg(newProps);
  }

  render(){
    return(
      <div>
        <label>Your average is: {this.state.average} </label>
      </div>
    )
  }
}

Average.PropTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string,
    weight:PropTypes.number.isRequired,
    mark:PropTypes.number.isRequired,
  }))),
  dispatch: PropTypes.func,
}

export default Average;
