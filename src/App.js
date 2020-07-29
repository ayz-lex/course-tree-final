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
      .attr('width', 10000)
      .attr('height', 10000)
      .style('fill', '#f9f9f9')

    const radius = classList.length 
    const angleChange = classList.length

    const coordinates = {cx: 50, cy: 50}

    svg.selectAll('circle')
      .data(classList)
      .enter()
      .append('circle')
        .attr('r', 50)
        .attr('cx', d => {
          const holder = coordinates.cx
          coordinates.cx += 3
          return holder
        })
        .attr('cy', d => {
          const holder = coordinates.cy
          coordinates.cy += 80
          return holder
        })
        .attr('stroke', 'black')
        .attr('fill', 'white')
        .append('text')
          .text(d => {
            return d
          })

  })

  return (
    <svg ref={ref}></svg>
  )
}

export default App
