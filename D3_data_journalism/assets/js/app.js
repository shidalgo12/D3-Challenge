var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(chartData) {
// Print data
  console.log(chartData);

  // cast the data from the csv as numbers
  chartData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  // Create a scale for your independent (x) coordinates
  var xScale = d3.scaleLinear()
    .domain(d3.extent(chartData, d => d.poverty))
    .range([0, width]);

  // Create a scale for your dependent (y) coordinates
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(chartData, d => d.healthcare)])
    .range([height, 0]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  // Append Axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
  .call(leftAxis);

  //Add Text Element to the svg
  var text = svg.selectAll("#scatter")
    .data(chartData)
    .enter()
    .append("text");
  
  // Add state abbreviations to text element
  var state = text
    .text(function (d) {return d.abbr;})
    .attr("font-family", "sans-serif")
    .attr("font-size", "5px")
    .attr("fill", "white");
  
  // Create Circles
  var circlesGroup = chartGroup.selectAll("circle").data(chartData).enter()
    circlesGroup.append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".5");

  circlesGroup.append("text")
    .text(function (d){
      return d.abbr;
    })
    .attr("dx", d => xScale(d.poverty))
    .attr("dy", d => yScale(d.healthcare))
    .attr("font-size", "8")
    .attr("class","stateText");

  // Add text to circlesGroup

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)")
    // .attr("font-family", "sans-serif")
    // .attr("font-size", "20px")
    // .attr("weight", "10px")
    // .attr("fill", "blue");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");
}).catch(function(error) {
  console.log(error);

});





//     // Step 6: Initialize tool tip
//     // ==============================
//     var toolTip = d3.tip()
//       .attr("class", "tooltip")
//       .offset([80, -60])
//       .html(function(d) {
//         return (`${d.abbr}<br>Hair length: ${d.poverty}<br>Hits: ${d.healthCare}`);
//       });

//     // Step 7: Create tooltip in the chart
//     // ==============================
//     chartGroup.call(toolTip);

//     // Step 8: Create event listeners to display and hide the tooltip
//     // ==============================
//     circlesGroup.on("click", function(data) {
//       toolTip.show(data, this);
//     });

//     // onmouseout event
//     // .on("mouseout", function(data, index) {
//     //   toolTip.hide(data);
//     // });

//     // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 40)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Lacks HealthCare (%)");

//     chartGroup.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("In Poverty (%)");
//   }).catch(function(error) {
//     console.log(error);
// });