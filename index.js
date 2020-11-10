// create 2 data_set
var data1 = [
   {group: "A", value: 4, value2: 1},
   {group: "B", value: 16, value2: 1},
   {group: "C", value: 8, value2: 1}
];

var data2 = [
   {group: "A", value: 7},
   {group: "B", value: 1},
   {group: "C", value: 20}
];


// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);


// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 20])
  .range([ height, 0]);


var data3;

d3.csv("data1.csv", function(data) {
  data3 = data;
  /*console.log("xx");
  console.log(data3);
  console.log("xx");*/

  // X axis
x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Location; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");



// Add Y axis
y = d3.scaleLinear()
  .domain([0, 5])
  .range([ height, 0]);
svg.append("g")
  .attr("class", "myYaxis")
  .call(d3.axisLeft(y));


  //update(svg, x, y, data, vars=2)
})

setTimeout(function(){
//console.log(data3);
update(svg, x, y, data3, vars=0);
},200);


var color = "green";
var triangleSize = 25;
var verticalTransform = 5 + Math.sqrt(triangleSize);

var triangle = d3.symbol()
            .type(d3.symbolTriangle)
            .size(triangleSize)
;


// A function that create / update the plot for a given variable:
function update(svg, x, y, data, vars=0) {

    var j = svg.selectAll(".myLine")
      .data(data)

    // variable u: map data to existing circle
    var u = svg.selectAll("circle")
      .data(data)

    var tort = svg.selectAll(".tort")
      .data(data)

    var meat = svg.selectAll(".meat")
      .data(data)

    var filling1 = svg.selectAll(".f1")
      .data(data)
    var filling2 = svg.selectAll(".f2")
      .data(data)
    var filling3 = svg.selectAll(".f3")
      .data(data)

    var unif = svg.selectAll(".unif")
      .data(data)

    var sals1 = svg.selectAll(".sals1")
      .data(data)
    var sals2 = svg.selectAll(".sals2")
      .data(data)


  /*var u = svg.selectAll("rect")
    .data(data)*/

  if (vars == 0) {
        // update lines
    j
      .enter()
      .append("line")
      .attr("class", "myLine")
      .merge(j)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("x1", function(d) { return x(d.Location); })
        .attr("x2", function(d) { return x(d.Location); })
        .attr("y1", y(0))
        .attr("y2", function(d) { return y(d.overall); })
        .attr("stroke", "grey")

        // update bars
    u
      .enter()
      .append("circle")
      .merge(u)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.overall); })
        .attr("r", 25)               // set the radius
        .style("stroke-opacity", .5) // set the stroke opacity
        .style("stroke", "red")      // set the line colour
        .style("fill", "none");

    tort
      .enter()
      .append("ellipse")
      .attr("class", "tort")
      .merge(tort)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Tortilla); })
        .attr("rx", 20)               // set the radius
        .attr("ry", 7.5)               // set the radius
        .style("fill", "#ffcc66");

    meat
      .enter()
      .append("rect")
      .attr("class", "meat")
      .merge(meat)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("x", function(d) { return x(d.Location)-10; })
        .attr("y", function(d) { return y(d.Meat)+4; })
        .attr("width", 20)
        .attr("height", 8)
        .attr("fill", "#800000");

    filling1
      .enter()
      .append("ellipse")
      .attr("class", "f1")
      .merge(filling1)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location)-5; })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#990000");

    filling2
      .enter()
      .append("ellipse")
      .attr("class", "f2")
      .merge(filling2)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#fff2e6");

    filling3
      .enter()
      .append("ellipse")
      .attr("class", "f3")
      .merge(filling3)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location)+5; })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#009900");

    unif
      .enter()
      .append("rect")
      .attr("class", "unif")
      .merge(unif)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("x", function(d) { return x(d.Location)-12.5; })
        .attr("y", function(d) { return y(d.Uniformity)+4; })
        .attr("width", 25)
        .attr("height", 3)
        .attr("fill", "black ");
    

    sals1
      .enter()
      .append("ellipse")
      .attr("class", "sals1")
      .merge(sals1)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location)-4; })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 5.5)               // set the radius
        .style("fill", "red");

    sals2
      .enter()
      .append("ellipse")
      .attr("class", "sals2")
      .merge(sals2)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location)+4; })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 5.5)               // set the radius
        .style("fill", "red");

    /*u
    .enter()
    .append("rect")
    .merge(u)
    .transition()
    .duration(1000)
      .attr("x", function(d) { return x(d.Location); })
      .attr("y", function(d) { return y(d.overall); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.overall); })
      .attr("fill", "#69b3a2")*/


  }
  else if (vars == 1) {
    j
      .enter()
      .append("line")
      .attr("class", "myLine")
      .merge(j)
      .transition()
      .duration(1000)
        .attr("x1", function(d) { return x(d.Location); })
        .attr("x2", function(d) { return x(d.Location); })
        .attr("y1", y(0))
        .attr("y2", function(d) { return y(d.Tortilla); })
        .attr("stroke", "grey")

        // update bars
    u
      .enter()
      .append("circle")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Tortilla); })
        .attr("r", 28)               // set the radius
        .style("stroke-opacity", .5) // set the stroke opacity
        .style("stroke", "red")      // set the line colour
        .style("fill", "none");

    tort
      .enter()
      .append("ellipse")
      .attr("class", "tort")
      .merge(tort)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Tortilla); })
        .attr("rx", 20)               // set the radius
        .attr("ry", 7.5)               // set the radius
        .style("fill", "#ffcc66");

    meat
      .enter()
      .append("rect")
      .attr("class", "meat")
      .merge(meat)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("x", function(d) { return x(d.Location)-10; })
        .attr("y", function(d) { return y(d.Meat)+4; })
        .attr("width", 20)
        .attr("height", 8)
        .attr("fill", "#800000");

    filling1
      .enter()
      .append("ellipse")
      .attr("class", "f1")
      .merge(filling1)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)-5; })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#990000");

    filling2
      .enter()
      .append("ellipse")
      .attr("class", "f2")
      .merge(filling2)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#fff2e6");

    filling3
      .enter()
      .append("ellipse")
      .attr("class", "f3")
      .merge(filling3)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)+5; })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#009900");

    unif
      .enter()
      .append("rect")
      .attr("class", "unif")
      .merge(unif)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("x", function(d) { return x(d.Location)-12.5; })
        .attr("y", function(d) { return y(d.Uniformity)+4; })
        .attr("width", 25)
        .attr("height", 3)
        .attr("fill", "black ");
    

    sals1
      .enter()
      .append("ellipse")
      .attr("class", "sals1")
      .merge(sals1)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)-4; })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 5.5)               // set the radius
        .style("fill", "red");

    sals2
      .enter()
      .append("ellipse")
      .attr("class", "sals2")
      .merge(sals2)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)+4; })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 5.5)               // set the radius
        .style("fill", "red");
  }
  else if (vars == 2) {
    j
      .enter()
      .append("line")
      .attr("class", "myLine")
      .merge(j)
      .transition()
      .duration(1000)
        .attr("x1", function(d) { return x(d.Location); })
        .attr("x2", function(d) { return x(d.Location); })
        .attr("y1", y(0))
        .attr("y2", function(d) { return y(d.Meat); })
        .attr("stroke", "grey")

        // update bars
    u
      .enter()
      .append("circle")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Meat); })
        .attr("r", 20)               // set the radius
        .style("stroke-opacity", .5) // set the stroke opacity
        .style("stroke", "red")      // set the line colour
        .style("fill", "none");

        tort
      .enter()
      .append("ellipse")
      .attr("class", "tort")
      .merge(tort)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Tortilla); })
        .attr("rx", 20)               // set the radius
        .attr("ry", 7.5)               // set the radius
        .style("fill", "#ffcc66");

    meat
      .enter()
      .append("rect")
      .attr("class", "meat")
      .merge(meat)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("x", function(d) { return x(d.Location)-10; })
        .attr("y", function(d) { return y(d.Meat)+4; })
        .attr("width", 20)
        .attr("height", 8)
        .attr("fill", "#800000");

    filling1
      .enter()
      .append("ellipse")
      .attr("class", "f1")
      .merge(filling1)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)-5; })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#990000");

    filling2
      .enter()
      .append("ellipse")
      .attr("class", "f2")
      .merge(filling2)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#fff2e6");

    filling3
      .enter()
      .append("ellipse")
      .attr("class", "f3")
      .merge(filling3)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)+5; })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#009900");

    unif
      .enter()
      .append("rect")
      .attr("class", "unif")
      .merge(unif)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("x", function(d) { return x(d.Location)-12.5; })
        .attr("y", function(d) { return y(d.Uniformity)+4; })
        .attr("width", 25)
        .attr("height", 3)
        .attr("fill", "black ");
    

    sals1
      .enter()
      .append("ellipse")
      .attr("class", "sals1")
      .merge(sals1)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)-4; })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 5.5)               // set the radius
        .style("fill", "red");

    sals2
      .enter()
      .append("ellipse")
      .attr("class", "sals2")
      .merge(sals2)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)+4; })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 5.5)               // set the radius
        .style("fill", "red");
  }
  else if (vars == 3) {
    j
      .enter()
      .append("line")
      .attr("class", "myLine")
      .merge(j)
      .transition()
      .duration(1000)
        .attr("x1", function(d) { return x(d.Location); })
        .attr("x2", function(d) { return x(d.Location); })
        .attr("y1", y(0))
        .attr("y2", function(d) { return y(d.Fillings); })
        .attr("stroke", "grey")

        // update bars
    u
      .enter()
      .append("circle")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("r", 20)               // set the radius
        .style("stroke-opacity", .5) // set the stroke opacity
        .style("stroke", "red")      // set the line colour
        .style("fill", "none");

        tort
      .enter()
      .append("ellipse")
      .attr("class", "tort")
      .merge(tort)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Tortilla); })
        .attr("rx", 20)               // set the radius
        .attr("ry", 7.5)               // set the radius
        .style("fill", "#ffcc66");

    meat
      .enter()
      .append("rect")
      .attr("class", "meat")
      .merge(meat)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("x", function(d) { return x(d.Location)-10; })
        .attr("y", function(d) { return y(d.Meat)+4; })
        .attr("width", 20)
        .attr("height", 8)
        .attr("fill", "#800000");

    filling1
      .enter()
      .append("ellipse")
      .attr("class", "f1")
      .merge(filling1)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location)-5; })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#990000");

    filling2
      .enter()
      .append("ellipse")
      .attr("class", "f2")
      .merge(filling2)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#fff2e6");

    filling3
      .enter()
      .append("ellipse")
      .attr("class", "f3")
      .merge(filling3)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location)+5; })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#009900");

    unif
      .enter()
      .append("rect")
      .attr("class", "unif")
      .merge(unif)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("x", function(d) { return x(d.Location)-12.5; })
        .attr("y", function(d) { return y(d.Uniformity)+4; })
        .attr("width", 25)
        .attr("height", 3)
        .attr("fill", "black ");
    

    sals1
      .enter()
      .append("ellipse")
      .attr("class", "sals1")
      .merge(sals1)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)-4; })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 5.5)               // set the radius
        .style("fill", "red");

    sals2
      .enter()
      .append("ellipse")
      .attr("class", "sals2")
      .merge(sals2)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)+4; })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 5.5)               // set the radius
        .style("fill", "red");
  }
  else if (vars == 4) {
    j
      .enter()
      .append("line")
      .attr("class", "myLine")
      .merge(j)
      .transition()
      .duration(1000)
        .attr("x1", function(d) { return x(d.Location); })
        .attr("x2", function(d) { return x(d.Location); })
        .attr("y1", y(0))
        .attr("y2", function(d) { return y(d.Uniformity); })
        .attr("stroke", "grey")

        // update bars
    u
      .enter()
      .append("circle")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Uniformity); })
        .attr("r", 25)               // set the radius
        .style("stroke-opacity", .5) // set the stroke opacity
        .style("stroke", "red")      // set the line colour
        .style("fill", "none");

        tort
      .enter()
      .append("ellipse")
      .attr("class", "tort")
      .merge(tort)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Tortilla); })
        .attr("rx", 20)               // set the radius
        .attr("ry", 7.5)               // set the radius
        .style("fill", "#ffcc66");

    meat
      .enter()
      .append("rect")
      .attr("class", "meat")
      .merge(meat)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("x", function(d) { return x(d.Location)-10; })
        .attr("y", function(d) { return y(d.Meat)+4; })
        .attr("width", 20)
        .attr("height", 8)
        .attr("fill", "#800000");

    filling1
      .enter()
      .append("ellipse")
      .attr("class", "f1")
      .merge(filling1)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)-5; })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#990000");

    filling2
      .enter()
      .append("ellipse")
      .attr("class", "f2")
      .merge(filling2)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#fff2e6");

    filling3
      .enter()
      .append("ellipse")
      .attr("class", "f3")
      .merge(filling3)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)+5; })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#009900");

    unif
      .enter()
      .append("rect")
      .attr("class", "unif")
      .merge(unif)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("x", function(d) { return x(d.Location)-12.5; })
        .attr("y", function(d) { return y(d.Uniformity)+4; })
        .attr("width", 25)
        .attr("height", 3)
        .attr("fill", "black ");
    

    sals1
      .enter()
      .append("ellipse")
      .attr("class", "sals1")
      .merge(sals1)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)-4; })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 5.5)               // set the radius
        .style("fill", "red");

    sals2
      .enter()
      .append("ellipse")
      .attr("class", "sals2")
      .merge(sals2)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)+4; })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 5.5)               // set the radius
        .style("fill", "red");
  }
  else if (vars == 5) {
    j
      .enter()
      .append("line")
      .attr("class", "myLine")
      .merge(j)
      .transition()
      .duration(1000)
        .attr("x1", function(d) { return x(d.Location); })
        .attr("x2", function(d) { return x(d.Location); })
        .attr("y1", y(0))
        .attr("y2", function(d) { return y(d.Salsa); })
        .attr("stroke", "grey")

        // update bars
    u
      .enter()
      .append("circle")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("r", 20)               // set the radius
        .style("stroke-opacity", .5) // set the stroke opacity
        .style("stroke", "red")      // set the line colour
        .style("fill", "none");

        tort
      .enter()
      .append("ellipse")
      .attr("class", "tort")
      .merge(tort)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Tortilla); })
        .attr("rx", 20)               // set the radius
        .attr("ry", 7.5)               // set the radius
        .style("fill", "#ffcc66");

    meat
      .enter()
      .append("rect")
      .attr("class", "meat")
      .merge(meat)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("x", function(d) { return x(d.Location)-10; })
        .attr("y", function(d) { return y(d.Meat)+4; })
        .attr("width", 20)
        .attr("height", 8)
        .attr("fill", "#800000");

    filling1
      .enter()
      .append("ellipse")
      .attr("class", "f1")
      .merge(filling1)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)-5; })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#990000");

    filling2
      .enter()
      .append("ellipse")
      .attr("class", "f2")
      .merge(filling2)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location); })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#fff2e6");

    filling3
      .enter()
      .append("ellipse")
      .attr("class", "f3")
      .merge(filling3)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("cx", function(d) { return x(d.Location)+5; })
        .attr("cy", function(d) { return y(d.Fillings); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 7)               // set the radius
        .style("fill", "#009900");

    unif
      .enter()
      .append("rect")
      .attr("class", "unif")
      .merge(unif)
      .transition()
      .duration(1000)
      .style("visibility", "hidden")
        .attr("x", function(d) { return x(d.Location)-12.5; })
        .attr("y", function(d) { return y(d.Uniformity)+4; })
        .attr("width", 25)
        .attr("height", 3)
        .attr("fill", "black ");
    

    sals1
      .enter()
      .append("ellipse")
      .attr("class", "sals1")
      .merge(sals1)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location)-4; })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 5.5)               // set the radius
        .style("fill", "red");

    sals2
      .enter()
      .append("ellipse")
      .attr("class", "sals2")
      .merge(sals2)
      .transition()
      .duration(1000)
      .style("visibility", "visible")
        .attr("cx", function(d) { return x(d.Location)+4; })
        .attr("cy", function(d) { return y(d.Salsa); })
        .attr("rx", 7)               // set the radius
        .attr("ry", 5.5)               // set the radius
        .style("fill", "red");
  }
  
}

