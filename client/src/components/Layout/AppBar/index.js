import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { IconButton, Button, Typography, Toolbar, AppBar } from 'material-ui';
import FontAwesome from 'react-fontawesome';
import styles from './styles';

class CustomAppBar extends Component {
  signOut = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  };

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

            <Button color="inherit" onClick={this.signOut}>
              Signout
            </Button>
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
