/* Projection */
var projection = d3
  .geoMercator() 
  .scale(7000)
  .center([41.7252782, 48.7723647]); 


var path = d3.geoPath()
      .projection(projection);


var map = d3
  .select("svg#map")
  // .attr( "preserveAspectRatio","xMidYMid meet")
  // .attr("width", 300)
  // .attr("height", 425);

function drawOblast(geojson) {
  map
    .selectAll("path#oblast")
    .data(geojson.geometries)
    .enter()
    .append('g')
    // .attr()
    .append("path")
    .attr('id', 'oblast')
    .attr("d", path) 
    .attr("fill", "blue")
    // .attr("fill-opacity", 0.5)
    .attr("stroke", "#222");
}

function drawAllRegions(){
  raionsList.forEach(name => {
    var obj = dataAll.find(el => el.id === name);
    region(obj);
  });
}


function region(geojson) {
  map
    .selectAll(`path#${geojson.id}`)
    .data(geojson.geometries)
    .enter()
    .append('g')
    .append("path")
    .attr('id', `region-${geojson.id}`)
    .attr("d", path) 
    .attr("fill", "green") 
    // .attr("fill-opacity", 0.5)
    .attr("stroke", "red")
    .attr('stroke-width', 0.5 )
    // .on("mouseover", handleMouseOver)
    // .on("mouseout", handleMouseOut)
    .on('click', clickRegion)
    
}

function clickRegion(obj){
  d3.select(this).attr('fill', 'red');
  drawPie(obj);
}

function handleMouseOver(d, i) {  // Add interactivity

  // Use D3 to select element, change color and size
  d3.select(this).attr(
    "fill", "aqua")

}

function handleMouseOut(d, i) {  // Add interactivity

  // Use D3 to select element, change color and size
  d3.select(this).attr(
    "fill", "red"
    )
}


/* Actions */
// drawOblast(oblast);
// drawAllRegions();