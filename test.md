# Hi this is H1
## Hi this is H2
### Hi this is H3
#### Hi this is H4
##### Hi this is H5
###### Hi this is H6
<p>This is text</p>
This is text

<a href="https://prajnaprabhu.com">Hyper link</a>
<strong>strong</strong>

<hr/>

<ul>
    <li>Unordered list 1</li>
     <li>Unordered list 1</li>
      <li>Unordered list 1</li>
       <li>Unordered list 1</li>
        <li>Unordered list 1</li>
        </ul>


<ol>
    <li>Unordered list 1</li>
     <li>Unordered list 1</li>
      <li>Unordered list 1</li>
       <li>Unordered list 1</li>
        <li>Unordered list 1</li>
        </ol>

<!-- blockquote  -->
> A block quote


<!-- code  -->
```
export default function Prajna(){
    return(
        <div>
            snjemerfer
        </div>
    )
}
```


<!-- pre  -->
<pre>
Hello, the pre tag
</pre>


<!-- table  -->
| Header 1 | Header 2 | Header 3 |
| --- | --- | --- |
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |


 <!-- task  -->
 - [ ] hi, this is open task
 - [x] completed task


 <!-- Mermaid syntax  -->
 pie title NETFLIX
         "Time spent looking for movie" : 90
         "Time spent watching it" : 10

sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?



graph LR
    A[Square Rect] -- Link text --> B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D




<!-- math  -->
```math
a + b = c
```