import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';
import './style.css';

class ItemList extends Component {
  render() {
    let list = <div className="itemWrapper" />;
    if (this.props.items) {
      list = (
        <div className="itemWrapper">
          {this.props.items.map((item, index) => {
            return (
              <Item
                item={item}
                key={index}
                id={index}
                deleteItem={this.props.deleteItem}
                type={this.props.type}
                onclick={this.props.onclick}
              />
            );
          })}
        </div>
      );
    }
    return <div>{list}</div>;
  }
}

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  deleteItem: PropTypes.func
};

export default ItemList;
