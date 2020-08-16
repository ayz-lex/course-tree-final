# Frontend

## Overview

Data Visualizer for CS course's at my current school. Displays data in two following ways:

1. Topological Ordering

    Given a course and all of its prerequisites, the site provides the best course of action an individual should take in order to qualify for a given course.

2. And-Or Tree

    Given a course and all of its prerequisites, the site provides a tree that displays all of the prerequisites in and/or tree fashion.

## Built With

* React
* Material UI - React UI component library
* D3.js - Data Visualization library


# Course Parser

## Overview

Webscraper for my university's CS courses for practical purposes. Saves scraped courses and required prerequisites in .json files in and-or tree format.

## Example

```java
//input string:
String str = "COMP 100 and (COMP 300 or COMP 400)";
```

```javascript
//output json object:
{
    "val": [
        {
            "val": "COMP 100", 
            "type": "leaf"
        },
        {
            "val": [
                {
                    "val": "COMP 300", 
                    "type": "leaf"
                },
                {
                    "val": "COMP 400", 
                    "type": "leaf"
                }
            ],
            "type": "or"
        }
    ],
    "type": "and"
}
```

## Built With

* Jsoup - HTML Parser
* JSON simple - Java's JSON manager
* JUnit - Unit Tests
* Maven - Build Tool/Dependency Manager
* Java - Language

## Todos

1. Standardize such that parser works on and string with strings containing `and` or `or` or `(` and `)`.
2. Write more edge case tests.