var data = [15, 40,100];
var chartSVG = d3.select('svg#chart');
var width = chartSVG.style('width').split('px')[0],
    height = chartSVG.style('height').split('px')[0];
var  radius =  Math.min(width, height)/2;

var color = d3.scaleOrdinal()
                .range(["#98abc5", "#8a89a6", "#7b6888"]);

var arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 70)

var labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40)

var pie = d3.pie()
            .sort(null)
            .value( tt => tt.value);

var chartSS = chartSVG
            // .append('svg')
            // .attr('width', width)
            // .attr('height', height)
        .append('g')
            .attr('transform', `translate(${width/2}, ${height/2})`)

function drawPie(wtf){

    /*  */
    // var selection = d3.select('svg#chart');

    chartSS.selectAll('.arc').remove();

    var g = chartSS.selectAll('.arc')
    .data(pie(wtf.features.ethnicity))
    .enter()
    .append('g')
    .attr('class', 'arc');
    
    g.append('path')
    .attr('d', arc)
    .style('fill', d => {
        return color(d.data.value)
    }
    ) 
    
    g.append('text')
    .attr("transform", d => `translate(${labelArc.centroid(d)})`)
    .attr('dy', ".35em")
    .text(d => {
        return d.data.name
    } 
    )
}