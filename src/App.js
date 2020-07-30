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

  const onSearch = e => {
    e.preventDefault()

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

  const changeHandler = e => {
    e.preventDefault()
    setCourse(e.target.value)
  }

  return (
    <React.Fragment>
      {search ? (
        <form onSubmit={onSearch}>
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
          <SVG tree={{...tree}} setTree={setTree}/>
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
            return 4
          }
        })
        .style('fill', '#f9f9f9')
        .attr('stroke', 'black')
        .style('stroke-width', 2)
    
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
