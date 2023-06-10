import React from 'react';
import ReactApexChart from 'react-apexcharts'
import axios from "axios";
import originURL from "../../url";
var moment = require('moment'); // require



class ApexPieChart extends React.Component {




  
  componentDidMount() {
    // Typical usage (don't forget to compare props):

    axios.get(`${originURL}/projects/stats/taskscountoverall/`).then((res) => {

      let requiredData = [res.data.pendingTasksCount, res.data.overdueTasksCount, res.data.completedTasks];

 

      

     

      this.setState({series:requiredData})
    });

    
  }



  constructor(props) {
    super(props);

    this.state = {
    
      series: [44, 55, 41, 17, 15],
      options: {
        chart: {
          type: 'donut',
        },
        labels: ['Upcomming', 'Overdue', 'Completed', 'Team D', 'Team E'],

        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
          
    };
  }



  render() {
    return (
      

<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
</div>


    );
  }
}

export default ApexPieChart;