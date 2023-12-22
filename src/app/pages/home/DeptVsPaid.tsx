import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import api from '../../services/services';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
interface TotalScholarshipGrafic {
  y: number;
  label:string;
} 

interface DeptVsPaintProps {
	className: string;
	chartColor: string;
	chartHeight: string;
	deptVsPaidx: TotalScholarshipGrafic[];
}

class DeptVsPaint extends Component<DeptVsPaintProps> {
  render() {
    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem) : null;

    const options = {
      animationEnabled: true,
      title: {
        text: user?.academicYear + ' ' + user?.academicSemesterText + ' dönemi ödenen - alınacak grafiği',
      },
      subtitles: [
        {
          text: this.props.deptVsPaidx.length > 0 ? api.paymetFormat(String(this.props.deptVsPaidx[0].y + this.props.deptVsPaidx[1].y)) + ' ödenen ' : '',
          verticalAlign: 'center',
          fontSize: 14,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: 'doughnut',
          showInLegend: false,
          indexLabel: '{label}: {y}',
          yValueFormatString: '₺#,##0.##',
          dataPoints: this.props.deptVsPaidx,
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart options={options} /* onRef={ref => this.chart = ref} */ />
      </div>
    );
  }
}

export default DeptVsPaint;