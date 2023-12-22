import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

interface TotalScholarshipGrafic {
  label: string;
  y: number;
}

interface ScolarshipTotalListProps {
  className: string;
  chartColor: string;
  chartHeight: string;
  scolarshipTotall: TotalScholarshipGrafic[];
}

class ScolarshipTotalList extends Component<ScolarshipTotalListProps> {
  addSymbols(e: { value: number }) {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
    if (order > suffixes.length - 1)
      order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJSReact.CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }

  render() {
    console.log(this.props.scolarshipTotall);
    const options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Öğrenci - Burs Miktarları",
        fontSize: 30,
      },
      axisX: {
        title: "Burslar",
        titleFontSize: 30,
        reversed: true,
        labelFontColor: "#4F81BC",
        labelFontSize: 10,
        labelFontFamily: "Comic Sans MS",
        labelFontWeight: "bold",
        labelWrap: false,
        interval: 1,
      },
      axisY: {
        title: "İlgili Bursu Alan Öğrenci Miktarı",
        titleFontSize: 20,
        includeZero: true,
        labelFontColor: "#4F81BC",
        labelFontSize: 10,
        labelFontFamily: "Comic Sans MS",
        labelFontWeight: "bold",
      },
      data: [{
        type: "bar",
        dataPoints: this.props.scolarshipTotall,
      }],
      height: 1000,
    };

    return (
      <div>
        <CanvasJSReact.CanvasJSChart options={options} />
      </div>
    );
  }
}

export default ScolarshipTotalList;
