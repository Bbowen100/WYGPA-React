import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DesiredAverage extends Component {
  constructor(props){
    super(props);
    this.state = {
      desiredAverage: 0,
      neededAvg:0,
    };
  }
  calcDesiredAverage(e){
    e.preventDefault();
    let desiredAvg = Number(this.refs.desiredAvg.value);
    let remWeight = Number(this.refs.remWeight.value);
    let weight = this.props.items.map((ele)=>ele.weight)
                                    .reduce((acc, val)=> acc+val);
    let totMarks = this.props.items.map(ele => ele.weight * ele.mark)
                          .reduce((acc, val)=>{ return acc + val; });
    let accumWeight = weight + remWeight;
    let needed = (((desiredAvg*accumWeight)-totMarks)/remWeight);
    this.setState({neededAvg: needed});
    this.setState({desiredAverage: desiredAvg});
  }

  render(){
    return(
      <div>
      <form onSubmit={this.calcDesiredAverage.bind(this)}>
        <input type="text" ref="desiredAvg" placeholder="Desired Average"/>
        <input type="text" ref="remWeight" placeholder="Remaining Weight"/>
        <button type="submit">Get Needed Average</button>
      </form>

        <section>To get {this.state.desiredAverage} you will need to get
          {this.state.neededAvg.toFixed(2)} over your remaining assignments
        </section>
      </div>
    )
  }
}

DesiredAverage.PropTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string,
    weight: PropTypes.number.isRequired,
    mark: PropTypes.number.isRequired,
  })))
}

export default DesiredAverage;
