import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import './style.css';

class Item extends Component {
  render() {
    let comp, name, weight, mark;
    if (this.props.item.name) {
      name = <div> Name: {this.props.item.name} </div>;
    }
    if (this.props.item.weight) {
      weight = <div>Weight: {this.props.item.weight}</div>;
    }
    if (this.props.item.mark) {
      mark = <div>Mark: {this.props.item.mark}</div>;
    }
    if (this.props.type === 'current') {
      comp = (
        <div>
          <Card>
            <CardContent
              className="clickable"
              onClick={() => this.props.onclick(this.props.item)}
            >
              <Typography variant="headline" component="h2">
                {name}
              </Typography>
              <Typography color="textSecondary">{weight}</Typography>
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
    } else {
      comp = (
        <div>
          <Card>
            <CardContent>
              <Typography variant="headline" component="h2">
                {name}
              </Typography>
              <Typography color="textSecondary">{weight}</Typography>
              <Typography color="textSecondary">{mark}</Typography>
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
    return comp;
  }
}

Item.PropTypes = {
  item: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string,
      weight: PropTypes.number,
      mark: PropTypes.number
    })
  ),
  id: PropTypes.objectOf(
    PropTypes.shape({
      index: PropTypes.number
    })
  )
};

export default Item;
