import React from "react";
import ReactEcharts from "echarts-for-react";

const AlphaaChart = ({ option, chartType, ...props }:any) => {
    if (chartType === "waterfall")
      return <ReactEcharts option={option} theme={"my_theme"} />;
    else return <ReactEcharts option={option} />;
};


// class AlphaaChart extends React.Component {
//   render() {
//     if (this.props.chartType === "waterfall")
//       return <ReactEcharts option={this.props.option} theme={"my_theme"} />;
//     else return <ReactEcharts option={this.props.option} />;
//   }
// }

export { AlphaaChart };
