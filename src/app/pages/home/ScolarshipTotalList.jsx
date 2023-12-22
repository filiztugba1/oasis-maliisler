/* App.js */
import { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class ScolarshipTotalList extends Component {
	
	render() {
		console.log(this.props.scolarshipTotall);
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Öğrenci - Burs Miktarları",
				fontSize:30,
			},
			axisX: {
				title: "Burslar",
				titleFontSize:30,
				reversed: true,
				labelFontColor: "#4F81BC",   // change font color
				labelFontSize: 10,           // change font size
				labelFontFamily: "Comic Sans MS",  // change font family
				labelFontWeight: "bold" ,     // change font weight,
				//  labelMaxWidth: 50,  // Etiketlerin maksimum genişliği
				labelWrap: false,    // Eğer etiket genişliği maksimum genişliği aşarsa, etiketleri sar
				interval: 1         // Her etiketi göster
			},
			axisY: {
				title: "İlgili Bursu Alan Öğrenci Miktarı",
				titleFontSize:20,
				includeZero: true,
				// labelFormatter: this.addSymbols,
				labelFontColor: "#4F81BC",   // change font color
				labelFontSize: 10,           // change font size
				labelFontFamily: "Comic Sans MS",  // change font family
				labelFontWeight: "bold"      // change font weight
				
			},
			data: [{
				type: "bar",
				dataPoints:this.props.scolarshipTotall
			}],
			height:1000
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
	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
}
export default ScolarshipTotalList;