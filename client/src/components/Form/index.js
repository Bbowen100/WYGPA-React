import { Component } from 'react';

class Form extends Component {
  render() {
    let comp;
    if (this.props.type == 'add-completed') {
      comp = (
        <div>
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
        </div>
      );
    } else if (this.props.type == 'add-current') {
      comp = (
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
      );
    }
    return comp;
  }
}
