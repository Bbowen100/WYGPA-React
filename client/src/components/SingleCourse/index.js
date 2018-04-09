import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'material-ui';
import * as actions from '../../actions';
import ItemList from '../ItemList';
import Average from '../Average';
import CustomAppBar from '../Layout/AppBar';
import DesiredAverage from '../DesiredAverage';
import Form from '../Form';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleAddCurrCrsEval = this.handleAddCurrCrsEval.bind(this);
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

  handleAddCurrCrsEval(params) {
    let { name, weight, mark } = params;
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
        <CustomAppBar
          text={name + ': ' + weight}
          dispatch={this.props.dispatch}
        />
        <Form
          type="complete"
          title="Add Evaluation"
          onSubmit={this.handleAddCurrCrsEval}
        />

        <div>
          <ItemList
            items={this.props.state.courses.currCourse.evals}
            deleteItem={this.deleteEvalHandler}
          />
        </div>

        <div className="tuple block">
          <Average
            items={this.props.state.courses.currCourse.evals}
            dispatch={this.props.dispatch}
          />

          <DesiredAverage items={this.props.state.courses.currCourse.evals} />
        </div>
        <div className="block">
          <Button color="primary" size="large" onClick={this.submitAsCompleted}>
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
