import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import FontAwesome from 'react-fontawesome';
import styles from './styles';

class CustomAppBar extends Component {
  render() {
    const { classes, text } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <Link to="/dashboard">
                <FontAwesome name="home" className={classes.Icon} />
              </Link>
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              {text.toUpperCase()}
            </Typography>
            <Button color="inherit">Signout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

CustomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string
};

export default withStyles(styles)(CustomAppBar);
