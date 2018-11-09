/* Projection */
var projection = d3
  .geoMercator()
  .scale(7000)
  .center([41.7252782, 48.7723647]);

var mapColors = {
  oblast: "blue",
  selected: "yellow",
  unselected: "green",
  strokeRaions: "black",
  unselectedOC: "red"
};

var path = d3.geoPath().projection(projection);

var map = d3.select("svg#map");

function drawOblast(geojson) {
  map
    .selectAll("path#oblast")
    .data(geojson.geometries)
    .enter()
    .append("g")
    .append("path")
    .attr("id", "oblast")
    .attr("d", path)
    .attr("fill", mapColors.selected)
    .attr("stroke", "#222")
    .attr("data-fill-flag", true)
    .on("click", clickRegion);
}

function drawAllRegionsOC() {
  raionsListOC.forEach(name => {
    var obj = dataAllOC.find(el => el.id === name);
    drawRegion(obj);
    drawInList(obj);
  });
}

function drawInList(obj) {
  var raionName = obj.geometries[0].features.name;
  d3.select(".header__raions-drawn")
    .append("li")
    .text(raionName);
}

function drawAllRegions() {
  raionsList.forEach(name => {
    var obj = dataAll.find(el => el.id === name);
    drawRegion(obj);
    drawInList(obj);
  });
}

function drawRegion(geojson) {
  map
    .selectAll(`path#${geojson.id}`)
    .data(geojson.geometries)
    .enter()
    .append("g")
    .append("path")
    .attr("id", `region-${geojson.id}`)
    .attr("d", path)
    .attr("fill", d => {
      var color = d.features.oc ? mapColors.unselectedOC : mapColors.unselected;
      return color;
    })
    .attr("data-fill-flag", false)
    .attr("stroke", mapColors.strokeRaions)
    .attr("stroke-width", 0.5)
    .on("click", clickRegion);
}

/* function clickRegion(obj){
  obj = {
    coordinates : array,
    features : {
      name : string,
      area : number,
      population : number,
      ethnicity : [{name : string, value : number}]
    }
  }
} */
function clickRegion(obj) {
  /* Change color to unselected for prewious selected raion */
  map
    .select("[data-fill-flag=true")
    .attr("fill", d => {
      if(d.features.name === "Luhansk Oblast") return mapColors.oblast;
      var color = d.features.oc ? mapColors.unselectedOC : mapColors.unselected;
      return color;
    })
    .attr("data-fill-flag", false);
  /* Change color to selected raion */

  d3.select(this)
    .attr("fill", mapColors.selected)
    .attr("data-fill-flag", true);
  changeRaionInfo(this.__data__.features);

  drawPie(obj);
}
