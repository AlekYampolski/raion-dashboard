var divIn = d3.select('div#interaction');

var interHeader = ".info__header";
var interArea = ".info__area";
var interPopul = ".info__population";
var interOC = ".info__oc";


/* 
function changeRaionInfo(obj)
    return : undefined;
    obj = {
        name : string,
        area : number,
        population : number,
        ethnicity : [
            {
                name : string, 
                value : number
            }
        ]
    }
*/
function changeRaionInfo(obj){
    var data = obj;

    /* Change header */
    divIn.select(interHeader)
        .text(data.name);
    /* Change Area */
    divIn.select(interArea)
        .text(`${data.area} km²`)

    /* Change Population */
    divIn.select(interPopul)
        .text(`${data.population}`);
    /* Change OC */
    // divIn.select(interArea)
    //     .text(data.area);
}