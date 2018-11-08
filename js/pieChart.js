/* Default settings */
var defaultSet = {
    name : "ukrainians",
    fontSizePercent : "44",
    fontSizeLabel : "32",
    colorSelected : 'white',
    colorUnselected : 'black',
    strokeWidthSelected : 2,
    strokeWidthUnSelected : 2,
    svgSelector : "svg#chart"
}

/* SVG settings */
var chartSVG = d3.select(defaultSet.svgSelector);
var width = chartSVG.style("width").split("px")[0];
var height = chartSVG.style("height").split("px")[0];
var radius = Math.min(width, height) / 2;

/* Colors for ethnic group */
var color = d3.scaleOrdinal()
                .domain(["ukrainians", "russians", "others"])                  
                .range(["#98abc5", "#8a89a6", "#7b6888"]);


/* Pie settings. Ra */
var arc = d3
  .arc()
  .outerRadius(radius - 10)
  .innerRadius(radius - 100);

var labelArc = d3
  .arc()
  .outerRadius(radius - 40)
  .innerRadius(radius - 40);

var pie = d3
  .pie()
  .sort(null)
  .value(tt => tt.value);

var chartGroup = chartSVG
  .append("g")
  .attr("transform", `translate(${20 + radius}, ${height / 2})`)
  .attr('class', 'chart-section');

var infoGroup = chartSVG
  .append("g")
  .attr("transform", `translate(${2*20 + 2*radius}, ${height / 2})`)
  .attr('class', 'info-section');

/* Format generator for percent */
var formatValue = d3.format('05,.2f'); 

/* 
function drawPie(data) ==>
  return : undefined
  typeof data = object  
  data = {
    coordinates : [] // not used
    features : features: {
        oc : boolean
        name: string,
        area: number,
        population:  number,
        ethnicity: [{name: string,value: number}]
      }
  }
*/

function drawPie(data) {
  /* Remove prev chart */
  chartGroup.selectAll(".arc").remove();

  var g = chartGroup
    .selectAll(".arc")
    .data(pie(data.features.ethnicity))
    .enter()
    .append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .attr('data-ethnic', d =>`${d.data.name}`)
    .attr("fill", d => color(d.data.name))
    .attr('stroke',  d => d.data.name === defaultSet.name ? defaultSet.colorSelected : defaultSet.colorUnselected)
    .attr('stroke-width', d => d.data.name === defaultSet.name ? defaultSet.strokeWidthSelected : defaultSet.strokeWidthUnSelected)
    .on('click', changeSelectedEl);

  /* Default text for value*/    
  g.append("text")
    .text(d =>  {
        if(d.data.name === defaultSet.name) return `${formatValue(d.data.value)}%`
    })
    .attr('transform', `translate(-${defaultSet.fontSizePercent*1.25}, 0)`)
    .attr('data-text', 'percent')
    .style('font-size', `${defaultSet.fontSizePercent}`);

  /* Default text for name*/
  g.append("text")
    .text(d =>  {
        if(d.data.name === defaultSet.name) return `${d.data.name}`
    })
    .attr('transform', `translate(0,30)`)
    .attr('data-text', 'name')
    .style('font-size', `${defaultSet.fontSizeLabel}`)
    .style("text-anchor", "middle");;
}

/* Ethnics 
 data = oblast.geometries[0].features.ethnicity
*/
function drawPieInfo(data){
  var selection = infoGroup.selectAll('.info-section__items');
  // selection.remove();

  var g = selection.data(data)
          .enter()
          .append('g')
          .attr('class', 'info-section__items')
    
  g.append('rect')
    .attr("fill", d => color(d.name))
    .attr("width", 40)
    .attr('height', 40)
    .attr('transform', (d,i) => `translate(0, ${-45*(1+i)})`);

  g.append('text')
    .text(d => d.name)
    .attr('transform', (d,i) => `translate(${40+5}, ${-45*(1+i)+45/2})`)
    .style('font-size', '25')
    
}

/* function changeSelectedEl() ==>
  return : undefined;
  this : path
*/
function changeSelectedEl(){
    chartGroup.selectAll('[data-ethnic')
        .attr('stroke', defaultSet.colorUnselected)
        .attr('stroke-width', defaultSet.strokeWidthUnSelected);

    chartGroup.select('[data-text=name]')
            .text(d=> `${this.__data__.data.name}`)
            .style("text-anchor", "middle");

    chartGroup.select('[data-text=percent]')
            .text( d=> `${formatValue(this.__data__.data.value)}%`);

    d3.select(this)
        .attr('stroke', defaultSet.colorSelected)
        .attr('stroke-width', defaultSet.strokeWidthSelected)
}