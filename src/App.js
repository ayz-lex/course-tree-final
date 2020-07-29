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
  const ref = useRef()
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState(true);
  const [tree, setTree] = useState();

  useEffect(() => {
    const svg = d3.select(ref.current)
    
  })

  const onSearch = e => {
    e.preventDefault()
    if (data[course]) {
      let heirarchy = {"name": course}

      const recurse = (node, heirarchyNode) => {
        if (node.type == "leaf") {
          heirarchyNode.push({
            "name": node.val
          })
        } else {
          let children = []
          node.val.forEach(cur => {
            recurse(cur, children)
          })
          heirarchyNode.push({
            "name": node.type,
            "children": children
          })
        }
      }

      if (data[course].type) {
        heirarchy["children"] = []
        recurse(data[course], heirarchy["children"])
      }

      setTree(heirarchy)

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
          <svg ref={ref}></svg>
        </div>
      )}
    </React.Fragment>
  )
}

export default App
