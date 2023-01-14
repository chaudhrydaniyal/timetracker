import { data } from 'jquery';
import React , { Component}  from 'react';
import ReactApexChart from 'react-apexcharts'
import axios from "axios";
import originURL from "../../url";






class RangeBarChart extends React.Component {

//   useEffect(() => {
//     axios.get(`${originURL}/projects/allprojects`).then((res) => {
//         setProjects(res.data.get);
//     });


// }, [update]);


componentDidMount() {
  // Typical usage (don't forget to compare props):


  axios.get(`${originURL}/projects/allprojects/${JSON.parse(localStorage.getItem("timesheet_user437")).details._id}`).then( (res) => {

    let dataToAdd = [];

    let temp = res.data.get.filter(f=>f.projectname != "Others");

    temp.map((t)=>{

      dataToAdd.push({x:t.projectname,
      y:[new Date(t.projectStartDate).getTime(),new Date(t.projectEndDate).getTime()]})

    })

    this.setState({series:[{data:dataToAdd}]});


});
}



  constructor(props) {
    super(props);

    this.state = {

      series: [
        {
          data: [
            {
              x: 'Code',
              y: [
                new Date('2019-03-02').getTime(),
                new Date('2019-03-04').getTime()
              ]
            },
            {
              x: 'Test',
              y: [
                new Date('2019-03-04').getTime(),
                new Date('2019-03-08').getTime()
              ]
            },
            {
              x: 'Validation',
              y: [
                new Date('2019-03-08').getTime(),
                new Date('2019-03-12').getTime()
              ]
            },
            {
              x: 'Deployment',
              y: [
                new Date('2019-03-12').getTime(),
                new Date('2019-03-18').getTime()
              ]
            }
          ]
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'rangeBar'
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        xaxis: {
          type: 'datetime'
        }
      },


    };
  }


 


  render() {
    return (

      <div id="chart" style={{backgroundColor:"white"}}>
        <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={this.state.series[0] ? this.state.series[0].data.length * 50 : 300} />
      </div>

    );
  }
}


export default RangeBarChart;