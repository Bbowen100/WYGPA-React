import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'reactstrap';
import * as actions from '../../actions';
import ItemList from '../ItemList';
import Average from '../Average';
import CustomAppBar from '../Layout/AppBar';
import DesiredAverage from '../DesiredAverage';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', weight: '', mark: '' };
    this.handleChange = this.handleChange.bind(this);
    this.deleteEvalHandler = this.deleteEvalHandler.bind(this);
    this.submitAsCompleted = this.submitAsCompleted.bind(this);
  }

  componentDidMount() {
    if (
      !this.props.state.auth.user ||
      Object.keys(this.props.state.courses.currCourse).length === 0
    ) {
      this.props.dispatch(push('/'));
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleAddCurrCrsEval(e) {
    e.preventDefault();
    let { name, weight, mark } = this.state;
    let assign = {
      name: name,
      weight: Number(weight),
      mark: Number(mark)
    };
    let course_id = this.props.state.courses.currCourse._id;
    this.props.dispatch(actions.addCurrCrsEval({ course_id, eval: assign }));
    this.setState({ name: '', weight: '', mark: '' });
  }

  deleteEvalHandler(assign) {
    let course_id = this.props.state.courses.currCourse._id;
    let eval_id = assign._id;
    this.props.dispatch(actions.delCurrCrsEval(eval_id, course_id));
  }

  submitAsCompleted() {
    let { name, weight, _id } = this.props.state.courses.currCourse;
    let mark = this.props.state.courses.currAverage;
    console.log('in the submitAsCompleted with ', name, weight, mark, _id);
    this.props.dispatch(
      actions.addCompCourse({
        name: name,
        mark: Number(mark),
        weight: Number(weight)
      })
    );
    this.props.dispatch(actions.delCurrCourse(_id));
    this.props.dispatch(push('/dashboard'));
  }

  render() {
    const { name, weight } = this.props.state.courses.currCourse;
    return (
      <div>
        <CustomAppBar text={name + ': ' + weight} />
        <form onSubmit={this.handleAddCurrCrsEval.bind(this)}>
          <section>
            Evaluation Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Eval Name"
              onChange={this.handleChange}
            />
          </section>
          <section>
            Evaluation Weight
            <input
              type="text"
              name="weight"
              value={this.state.weight}
              placeholder="Eval Weight"
              onChange={this.handleChange}
            />
          </section>
          <section>
            Evaluation Mark
            <input
              type="text"
              name="mark"
              value={this.state.mark}
              placeholder="Eval Mark"
              onChange={this.handleChange}
            />
          </section>
          <Button type="submit" size="sm" color="info">
            {' '}
            Add Completed Evalution{' '}
          </Button>
        </form>

        <div>
          <ItemList
            items={this.props.state.courses.currCourse.evals}
            deleteItem={this.deleteEvalHandler}
          />
        </div>

        <div className="block">
          <div>
            <Average
              items={this.props.state.courses.currCourse.evals}
              dispatch={this.props.dispatch}
            />
          </div>
          <div>
            <DesiredAverage items={this.props.state.courses.currCourse.evals} />
          </div>
        </div>
        <div className="block">
          <Button color="info" size="lg" onClick={this.submitAsCompleted}>
            Submit As Completed
          </Button>
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

const SingleCourse = connect(mapStateToProps, mapDispatchToProps)(App);

export default SingleCourse;
