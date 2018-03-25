import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ItemList from '../ItemList';
import Average from '../Average';
import Chart from '../Chart';
import DesiredAverage from '../DesiredAverage';
import * as actions from '../../actions';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cc_name: '',
      cc_weight: '',
      name: '',
      weight: '',
      mark: ''
    };
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

  handleAddCompCourse = e => {
    e.preventDefault();
    let { name, mark, weight } = this.state;
    this.props.dispatch(
      actions.addCompCourse({
        name: name,
        mark: Number(mark),
        weight: Number(weight)
      })
    );
    this.setState({ name: '', mark: '', weight: '' });
  };

  handleAddCurrentCourse = e => {
    e.preventDefault();
    let { cc_name, cc_weight } = this.state;
    this.props.dispatch(
      actions.addCurrCourse({
        name: cc_name,
        weight: Number(cc_weight)
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
      <div className="App">
        <h1>Welcome To Your Dashboard {this.props.state.auth.user}</h1>

        <h2> Current Courses </h2>
        <form onSubmit={this.handleAddCurrentCourse.bind(this)}>
          <section>
            Course Name
            <input
              type="text"
              name="cc_name"
              value={this.state.cc_name}
              onChange={this.handleChange}
              placeholder="Course Name"
            />
          </section>
          <section>
            Course Weight
            <input
              type="text"
              name="cc_weight"
              value={this.state.cc_weight}
              onChange={this.handleChange}
              placeholder="Course Weight"
            />
          </section>
          <Button type="submit" size="sm" color="info">
            Add Current Course
          </Button>
        </form>

        <ItemList
          items={this.props.state.courses.currCourses}
          deleteItem={this.handleDelCourse}
          type="current"
          onclick={this.handleGoToCurrCourse}
        />

        <h2> Completed Courses </h2>
        <form onSubmit={this.handleAddCompCourse.bind(this)}>
          <section>
            Course Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Course Name"
            />
          </section>
          <section>
            Course Weight
            <input
              type="text"
              name="weight"
              value={this.state.weight}
              onChange={this.handleChange}
              placeholder="Course Weight"
            />
          </section>
          <section>
            Final Mark
            <input
              type="text"
              name="mark"
              value={this.state.mark}
              onChange={this.handleChange}
              placeholder="Final Course Mark"
            />
          </section>
          <Button type="submit" size="sm" color="info">
            Add Completed Course
          </Button>
        </form>

        <ItemList
          items={this.props.state.courses.compCourses}
          deleteItem={this.handleDelCourse}
          type="completed"
        />

        <div>
          <Average
            items={this.props.state.courses.compCourses}
            dispatch={this.props.dispatch}
          />
        </div>

        <div>
          <DesiredAverage items={this.props.state.courses.compCourses} />
        </div>

        <div>
          <Chart courses={this.props.state.courses.compCourses} />
        </div>
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
