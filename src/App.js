import React, { useEffect, useRef } from 'react'
import classList from './data/classList.json'
import data from './data/classes.json'
import * as d3 from 'd3'

//select/ selectall selects dom element
/*
style adds css
attr adds attributes
text changes tag element
append adds additional html content
.data(data).enter().append() // data adds data, enter enters each data element, and everything that follows adds.
*/

const App = () => {
  const ref = useRef()
  
  useEffect(() => {

    const svg = d3.select(ref.current)
      .attr('width', 500)
      .attr('height', 500)
      .style('fill', '#f9f9f9')

    svg.selectAll('circle')
      .data(classList)
      .enter()
      .append('circle')
        .attr('r', 20)
        .style('fill', '#69b3a2')

    
        
  })

  return (
    <svg ref={ref}></svg>
  )
}

export default App
