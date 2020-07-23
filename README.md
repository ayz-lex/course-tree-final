# Course Parser

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

* Parsing HTML: Jsoup
* Packaging into JSON: JSON simple
* Testing: JUnit
* Build Tool: Maven
* Language: Java

## Todos

1. Standardize such that parser works on and string with strings containing `and` or `or` or `(` and `)`.
2. Write more edge case tests.