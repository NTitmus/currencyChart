import React, {useState, useRef, useEffect} from 'react';
import * as d3 from 'd3';
import { useD3 } from './useD3';

const BarChart2 = ({data}) => {
    
    const [dataList, setDataList] = useState([])
    const canvasHeight = 400;
    const canvasWidth = 600;
    //const scale = 800000;
    //const adjust = 648300;

    const drawBarChart = (da) =>{
        console.log('hi!***')
        const rates = da.map((d)=>Number(d.rate));
        console.log(rates)
        const max = Math.max(...rates);
        const min = Math.min(...rates);
        console.log('max', max)
        console.log('min', min)
        const sca = () => {
            if (max-min===0) {return (300/max)} 
            else {return ((300)/((max-min)));}
        }
        
        
        console.log('sca', sca())
        const ad = (min*sca()-40);
        const zeroLabel = (ad*min)/(40+ad)

        const svgCanvas = d3.select(ref.current).append("svg").attr("width", 600).attr("height", 400).style("border","1px solid black")
        
        svgCanvas.selectAll("rect").data(da).enter()
            .append("rect")
            .attr("width", 75)
            //.attr("height", (datapoint) => (datapoint.rate * scale-adjust))
            .attr("height", (datapoint) => (Number(datapoint.rate).toFixed(5) * (sca())-ad))
            .attr("fill", "orange")
            .attr("x", (a,iteratio)=> iteratio * 100 + 15)
            //.attr("y", (datapoint) => canvasHeight - (datapoint.rate * scale-adjust))
            .attr("y", (datapoint) => canvasHeight - (Number(datapoint.rate).toFixed(5) * (sca())-ad))


        svgCanvas.selectAll(".valueLabel")
        .data(da).enter()
        .append("text")
        .attr("class", "valueLabel")
        .attr("x", (datapoint, i)=> i * 100 + 15)
        //.attr("y", (datapoint, i) => canvasHeight-(datapoint.rate*scale-adjust)-10) 
        .attr("y", (datapoint, i) => canvasHeight-(Number(datapoint.rate).toFixed(5)*(sca())-ad)-10) 
        .text(datapoint=>Number(datapoint.rate).toFixed(5))

        const parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S")

        svgCanvas.selectAll(".label")
        .data(da).enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (datapoint, i)=> i * 100 + 15)
        .attr("y", (datapoint, i)=> canvasHeight-(Number(datapoint.rate).toFixed(5)*(sca())-ad)+15)
        .text(datapoint=>parseDate(datapoint.datetime).toLocaleTimeString())

        svgCanvas
        .append("text")
        .attr("class", "axesLabel")
        .attr("x", 5)
        .attr("y", canvasHeight-5)
        .text(zeroLabel.toFixed(5))
        
        
    }
//return () => {d3.select(ref.current).remove()};
    const ref = useD3( ()=>{
        if (data.length===0){
            console.log('empty')
            return
        } else {
        drawBarChart(data);
        }
    }
    , [data]);

    //useEffect(()=>{setDataList(data)}, [data]

    //)

    return(
        <div ref={ref}></div>
    );

    
}



export default BarChart2