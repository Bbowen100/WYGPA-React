import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.courses.length > 0) {
      let marks = newProps.courses.map(course => course.mark);
      let names = newProps.courses.map(course => course.name);
      let avgList = [];
      for (let i = 0; i < marks.length; i++) {
        avgList.push(newProps.average);
      }
      let obj = {
        labels: names,
        datasets: [
          {
            label: 'Mark',
            type: 'bar',
            data: marks,
            backgroundColor: '#4867aa'
          },
          {
            label: 'Average',
            type: 'line',
            data: avgList,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#dca500'
          }
        ]
      };
      this.setState({ chartData: obj });
    }
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: 'Marks For Your Completed Courses'
            },
            legend: {
              display: true
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
