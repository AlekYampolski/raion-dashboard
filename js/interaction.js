var divIn = d3.select('div#interaction');

var interHeader = ".raion-info__header";
var interArea = ".raion-info__area";
var interPopul = ".raion-info__population";
var interOC = ".raion-info__oc";


function changeRaionInfo(obj){
    // features:Object {name: "Novopsk
    // var data = obj.features;
    var data = obj;
    /* Change header */
    divIn.select(interHeader)
        .text(data.name);
    /* Change Area */
    divIn.select(interArea)
        .text(data.area)

    /* Change Population */
    divIn.select(interPopul)
        .text(data.population);
    /* Change OC */
    divIn.select(interArea)
        .text(data.area);
}