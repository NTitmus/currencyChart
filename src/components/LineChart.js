import React, {useState, useRef, useEffect} from 'react';
import * as d3 from 'd3';
import { useD3 } from './useD3';

const LineChart = ({data}) => {
    
    const [dataList, setDataList] = useState([])

    
    const drawBarChart = (da) =>{


    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S")
    const dataParsed = da.map(d=>{return {datetime: parseDate(d.datetime), num: d.num, rate: Number(d.rate)}})

    console.log('hi!***')
    //const rates = da.map((d)=>Number(d.rate));
    const rates = dataParsed.map((d)=>d.rate)
    console.log(rates)
    const max = Math.max(...rates);
    const min = Math.min(...rates);
    console.log('max', max)
    console.log('min', min)

    const svgCanvas = d3.select(ref.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border","1px solid black")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    
    //const dates = da.map((d)=>parseDate(d.datetime))
    const dates = dataParsed.map((d)=>d.datetime)
    console.log('minmax')
    console.log(dates)
    const maxDate = d3.max(dates)
    const minDate = d3.min(dates)
    console.log(minDate)
    console.log(maxDate)
    //[d3.min((da)=>{parseDate(da.datetime)}), d3.max((da)=>{parseDate(da.datetime)})]
    const xScale = d3.scaleTime().domain([minDate,maxDate]).range([0, width]);
    const yScale = d3.scaleLinear().domain([min, max]).range([height, 0]);
    
    svgCanvas.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale));
        
    svgCanvas.append("g")
         .call(d3.axisLeft(yScale));

    svgCanvas.append('g')
         .selectAll("dot")
         .data(dataParsed)
         //.data(da)
         .enter()
         .append("circle")
         //.attr("cx", (dataSet) => (xScale(parseDate(dataSet.datetime)) ))
         //.attr("cy", (dataSet) => (yScale(dataSet.rate)) )
         .attr("cx", (d) => (xScale(d.datetime) ))
         .attr("cy", (d) => (yScale(d.rate)) )
         .attr("r", 2)
         //.attr("transform", "translate(" + 100 + "," + 100 + ")")
         .style("fill", "#CC0000");

    const line = d3.line()
         .x((d)=>(xScale(d.datetime))) 
         .y((d)=>(yScale(d.rate))) 
         .curve(d3.curveMonotoneX)
    
         svgCanvas.append("path")
         .datum(dataParsed) 
         .attr("class", "line") 
         //.attr("transform", "translate(" + 100 + "," + 100 + ")")
         .attr("d", line)
         .style("fill", "none")
         .style("stroke", "#CC0000")
         .style("stroke-width", "2");
        
    }
//return () => {d3.select(ref.current).remove()};
    const ref = useD3( ()=>{
        if (data.length===0){
            console.log('empty')
            return
        } else {
        drawBarChart(data);
        console.log('hi!!!***&&&&')
        }
    }
    , [data]);

    //useEffect(()=>{setDataList(data)}, [data]

    //)

    return(
        <div ref={ref}></div>
    );

    
}



export default LineChart