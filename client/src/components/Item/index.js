import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import './style.css';

class Item extends Component {
  render() {
    let name, weight, mark;
    if (this.props.item.name) {
      name = <div> {this.props.item.name} </div>;
    }
    if (this.props.item.weight) {
      weight = <div>Weight: {this.props.item.weight}</div>;
    }
    if (this.props.item.mark) {
      mark = <div>Mark: {this.props.item.mark}</div>;
    }
    const current = this.props.type === 'current';

    return (
      <div>
        <Card style={{ backgroundColor: '#e6edfb' }}>
          <CardContent
            className={current ? 'clickable item' : 'item'}
            onClick={
              current ? () => this.props.onclick(this.props.item) : undefined
            }
          >
            <Typography style={{ fontWeight: 'bold', fontSize: '2em' }}>
              {name}
            </Typography>
            <Typography color="textSecondary">{weight}</Typography>
            {!current && <Typography color="textSecondary">{mark}</Typography>}
          </CardContent>
          <CardActions>
            <FontAwesome
              className="clickable"
              name="trash"
              onClick={() =>
                this.props.deleteItem(this.props.item, this.props.type)
              }
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object,
  id: PropTypes.number
};

export default Item;
