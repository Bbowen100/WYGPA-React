import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ItemList from '../ItemList';
import Average from '../Average';
import Chart from '../Chart';
import CustomAppBar from '../Layout/AppBar';
import DesiredAverage from '../DesiredAverage';
import Form from '../Form';
import * as actions from '../../actions';
import './style.css';

import 'bootstrap/dist/css/bootstrap.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleGoToCurrCourse = this.handleGoToCurrCourse.bind(this);
    this.handleDelCourse = this.handleDelCourse.bind(this);
  }

  componentDidMount() {
    if (!this.props.state.auth.user) {
      this.props.dispatch(push('/'));
    }
    this.props.dispatch(actions.getCompCourses());
    this.props.dispatch(actions.getCurrCourses());
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleAddCompCourse = params => {
    let { name, mark, weight } = params;
    this.props.dispatch(
      actions.addCompCourse({
        name,
        mark: Number(mark),
        weight: Number(weight)
      })
    );
  };

  handleAddCurrentCourse = params => {
    let { name, weight } = params;
    this.props.dispatch(
      actions.addCurrCourse({
        name,
        weight: Number(weight)
      })
    );
    this.setState({ cc_name: '', cc_weight: '' });
  };

  handleDelCourse = (course, type) => {
    if (type === 'completed') {
      this.props.dispatch(actions.delCompCourse(course._id));
    } else {
      this.props.dispatch(actions.delCurrCourse(course._id));
    }
  };

  handleGoToCurrCourse = course => {
    this.props.dispatch(actions.setCurrCourse(course));
    this.props.dispatch(push('/current-course', {}));
  };

  render() {
    return (
      <div>
        <CustomAppBar
          text={this.props.state.auth.user + "'s dashboard"}
          dispatch={this.props.dispatch}
        />

        <Form
          type="partial"
          title="Create Current Course"
          onSubmit={this.handleAddCurrentCourse}
        />

        <ItemList
          items={this.props.state.courses.currCourses}
          deleteItem={this.handleDelCourse}
          type="current"
          onclick={this.handleGoToCurrCourse}
        />

        <Form
          title="Create Completed Course"
          type="complete"
          onSubmit={this.handleAddCompCourse}
        />

        <ItemList
          items={this.props.state.courses.compCourses}
          deleteItem={this.handleDelCourse}
          type="completed"
        />

        <div className="tuple">
          <Average
            items={this.props.state.courses.compCourses}
            dispatch={this.props.dispatch}
          />

          <DesiredAverage items={this.props.state.courses.compCourses} />
        </div>

        <Chart
          courses={this.props.state.courses.compCourses}
          average={this.props.state.courses.currAverage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { state };
};
const mapDispatchToProps = (dispatch, props) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
