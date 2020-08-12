import React, {useEffect, useRef, useState} from 'react'

import classList from './data/classList.json'
import classTitleList from './data/classTitleList.json'
import data from './data/classes.json'

import * as d3 from 'd3'

import {
  Select,
  FormControl,
  Button,
  InputLabel,
  MenuItem,
} from '@material-ui/core'

import {makeStyles} from '@material-ui/core/styles'

const App = () => {
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState(true);
  const [tree, setTree] = useState();
  const [error, setError] = useState();

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

      setError(false)
      setTree(hierarchy)
      setSearch(false)

    } else {
      setError(true)
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

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: window.innerHeight / 6,
    },
    button: {
      width: '100px'
    },
    select: {
      width: '100px'
    }
  }));

  const classes = useStyles()

  return (
    <React.Fragment>
      {search ? (
        <form className={classes.root}>
          <FormControl variant="outlined" className={classes.select} error={error}>
            <InputLabel id="demo-simple-select-outlined-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={course}
              onChange={changeHandler}
              label="Course Title"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {classTitleList.map(title => {
                return <MenuItem value={title}>{title}</MenuItem>
              })}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={searchHandler} className={classes.button}>
            Submit
          </Button>
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

    const height = window.innerHeight > 500 ? window.innerHeight : 500
    const width = window.innerWidth > 1200 ? window.innerWidth : 1200

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
            + "C" + (d.parent.y + 25) + "," + d.x
            + " " + (d.parent.y + 120) + "," + d.parent.x // 50 and 150 are coordinates of inflexion, play with it to change links shape
            + " " + d.parent.y + "," + d.parent.x;
        })
        .style('fill', "none")
        .attr('stroke', d => {
          if (d.parent.data.name === "or") {
            return "green"
          } else {
            return "red"
          }
        })
        .attr('stroke-width', 3)

    let tooltip = d3.select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '2px')
      .style('padding', '5px')

    svg.selectAll('g')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('transform', d => {
        return "translate(" + d.y + "," + d.x + ")"
      })
      .on('click', (d, i) => {
        if (d.data.name !== "or" && d.data.name !== "and" && classList[d.data.name]) {
          d3.select(ref.current).select('g').remove()
          d3.select('body').selectAll('#tooltip').remove()
          props.newSearch(d.data.name)
        }
      })
      .on('mouseover', (d) => {
        if (classList[d.data.name]) {
          return tooltip
            .style('visibility', 'visible')
            .text(classList[d.data.name])
        } else {
          return tooltip
            .style('visibility', 'visible')
            .text('Description: Class Description not available.')
        }
      })
      .on('mousemove', (d) => {
        return tooltip
          .style('top', (d3.event.pageY - 10) + 'px')
          .style('left', (d3.event.pageX + 10) + 'px') 
      })
      .on('mouseout', (d) => {
        return tooltip
          .style('visibility', 'hidden')
      })
      .append('ellipse')
        .attr('rx', d => {
          if (d.data.name === "or" || d.data.name === "and") {
            return 15
          } else {
            return 30
          }
        })
        .attr('ry', d => {
          if (d.data.name === "or" || d.data.name === "and") {
            return 14
          } else {
            return 15
          }
        })
        .style('fill', '#a9a9a9')
        .attr('cursor', d => {
          if (d.data.name === "or" || d.data.name === "and") {
            return "none"
          } else {
            return "pointer"
          }
        })
        .attr('stroke', 'black')
        .attr('stroke-width', '2px')
    
    svg.selectAll('g')
      .append('text')
        .text(d => {
          return d.data.name
        })
        .attr('dx', d => {
          if (d.data.name === "or") {
            return -6
          } else if (d.data.name === "and") {
            return -9
          } else {
            return -28
          }
        })
        .attr('dy', 3)
        .style('font-size', 12)
  })

  return (
    <svg ref={ref}></svg>
  )
}

export default App
