var undranwRaions = [
    "Svatove Raion",
    "Starobilsk Raion",
    "Novoaidar Raion",
    "Popasna Raion",
    "Antratsyt Raion",
    "Lutuhyne Raion",
    "Sverdlovsk Raion"
]

d3.select('.header__raions-undrawn')
    .selectAll('li')
    .data(undranwRaions)
    .enter()
    .append('li')
    .text(d => d)

    
changeRaionInfo(oblast.geometries[0].features)
drawOblast(oblast);
drawAllRegions();
drawAllRegionsOC();

drawPie(oblast.geometries[0]);
drawPieInfo(oblast.geometries[0].features.ethnicity);

