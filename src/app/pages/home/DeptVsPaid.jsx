/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
import api from '../../services/services';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class DeptVsPaint extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title: {
				text: "2022 bahar dönemi ödenen - alınacak grafiği"
			},
			subtitles: [{
				text: this.props.deptVsPaidx.length>0?api.paymetFormat((this.props.deptVsPaidx[0].y+this.props.deptVsPaidx[1].y))+' ödenen ':'',
				verticalAlign: "center",
				fontSize: 14,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: false,
				indexLabel: "{label}: {y}",
				yValueFormatString: "₺#,##0.##",
				dataPoints: this.props.deptVsPaidx
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default DeptVsPaint;