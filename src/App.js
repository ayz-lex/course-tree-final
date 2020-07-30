import React, {useEffect, useRef, useState} from 'react'
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
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState(true);
  const [tree, setTree] = useState();

  const onSearch = () => {
    let visited = new Set()

    if (data[course]) {
      let hierarchy = {"name": course}

      visited.add(course)

      const buildHierarchy = (node, hierarchyNode) => {
        if (node.type === "leaf") {
          if (!visited.has(node.val)) {
            if (data[node.val] && data[node.val].type) {
              visited.add(node.val)
              let children = []
              buildHierarchy(data[node.val], children)
              hierarchyNode.push({
                "name": node.val,
                "children": children,
              })
            } else {
              hierarchyNode.push({
                "name": node.val
              })
              visited.add(node.val)
            }  
          } else {
            hierarchyNode.push({
              "name": node.val,
            })
          }
        } else {
          let children = []
          node.val.forEach(cur => {
            buildHierarchy(cur, children)
          })
          hierarchyNode.push({
            "name": node.type,
            "children": children
          })
        }
      }

      if (data[course].type) {
        hierarchy["children"] = []
        buildHierarchy(data[course], hierarchy["children"])
      }

      setTree(hierarchy)
      setSearch(false)

    } else {
      alert('Class not Found')
    }
  }

  const searchHandler = e => {
    e.preventDefault()
    onSearch()
  }

  const changeHandler = e => {
    e.preventDefault()
    setCourse(e.target.value)
  }

  const newSearch = (newCourse) => {
    setSearch(true)
    setCourse(newCourse)
    onSearch()
  }

  return (
    <React.Fragment>
      {search ? (
        <form onSubmit={searchHandler}>
          <input 
            label="Enter Class"
            type="text"
            name="course"
            onChange={changeHandler}
            required
          />
          <button>
            Search
          </button>
        </form>
      ) : (
        <div>
          <SVG 
            tree={{...tree}} 
            newSearch={newSearch}
          />
        </div>
      )}
    </React.Fragment>
  )
}

const SVG = (props) => {
  const ref = useRef()

  useEffect(() => {
    const height = 1000
    const width = 1000

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
        .attr("transform", "translate(40, 40)")

    const cluster = d3.cluster()
      .size([height - 100, width - 100])

    const root = d3.hierarchy(props.tree, d => {
      return d.children
    })

    cluster(root)

    svg.selectAll('path')
      .data(root.descendants().slice(1))
      .enter()
      .append('path')
        .attr('d', d => {
          return "M" + d.y + "," + d.x
            + "C" + (d.parent.y + 50) + "," + d.x
            + " " + (d.parent.y + 120) + "," + d.parent.x // 50 and 150 are coordinates of inflexion, play with it to change links shape
            + " " + d.parent.y + "," + d.parent.x;
        })
        .style('fill', "none")
        .attr('stroke', d => {
          if (d.parent.data.name === "or") {
            return "red"
          } else {
            return "green"
          }
        })

    let tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')

    svg.selectAll('g')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('transform', d => {
        return "translate(" + d.y + "," + d.x + ")"
      })
      .append('circle')
        .attr('r', d => {
          if (d.data.name === "or" || d.data.name == "and") {
            return 1
          } else {
            return 6
          }
        })
        .style('fill', '#f9f9f9')
        .attr('stroke', 'black')
        .style('stroke-width', 2)
        .attr('cursor', d => {
          if (d.data.name === "or" || d.data.name == "and") {
            return "none"
          } else {
            return "pointer"
          }
        })
        .on('click', (d, i) => {
          if (d.data.name !== "or" && d.data.name !== "and") {
            props.newSearch(d.data.name)
          }
        })
        .on('mouseover', (d, i) => {
          if (classList[d.data.name]) {
            return tooltip
              .text(classList[d.data.name])
              .style('visibility', 'visible')
              .style('top', (d.x + 40) + 'px')
              .style('left', (d.y + 80) + 'px')
              .attr({
                'position': 'absolute',
                'z-index': '10',
                'visibility': 'hidden',
                'background-color': 'lightblue',
                'text-align': 'center',
                'padding': '4px',
                'border-radius': '4px',
                'font-weight': 'bold',
                'color': 'orange'
              })
          }
        })

    
        /*
        .append("svg:title")
          .text(d => {
            if (classList[d.data.name]) {
              return classList[d.data.name]
            } else {
              return "no info"
            }
          })
    */
    
    svg.selectAll('g')
      .append('text')
        .text(d => {
          return d.data.name
        })
        .style('font-size', 12)
  })

  return (
    <svg ref={ref}></svg>
  )
}

export default App
