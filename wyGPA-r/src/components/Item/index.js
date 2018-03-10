import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './style.css';

class Item extends Component {

  render(){
    let comp, name, weight, mark;
    if(this.props.item.name){
      name = (<div> Name: {this.props.item.name} </div>)
    }
    if(this.props.item.weight){
      weight = (<div>Weight: {this.props.item.weight}</div>)
    }
    if(this.props.item.mark){
      mark = (<div>Mark: {this.props.item.mark}</div>)
    }
    if(this.props.type === 'current'){
      comp = (
        <div>
          <div className="item current" onClick={()=>this.props.onclick(this.props.item)}>
            {name}
            {weight}
          </div>
          <div onClick={()=>this.props.deleteItem(this.props.item, this.props.type)}>
            <FontAwesome name='trash' />
          </div>
        </div>
      )
    }
    else{
      comp = (
        <div>
          <div className="item completed">
            {name}
            {weight}
            {mark}
          </div>
          <div onClick={()=>this.props.deleteItem(this.props.item, this.props.type)}>
            <FontAwesome name='trash' />
          </div>
        </div>
      )
    }
    return(comp)
  }
}

Item.PropTypes = {
  item: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string,
    weight: PropTypes.number,
    mark: PropTypes.number,
  })),
  id: PropTypes.objectOf(PropTypes.shape({
    index: PropTypes.number,
  })),
}

export default Item;
