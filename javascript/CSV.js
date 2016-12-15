var historique = "name,relation,parent";

var test_csv = "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n" +
                "name,relation,parent\n"
                ;



function CSV_JSON(csv){
    buildHistorique(csv)
    //console.log(historique);
    data = d3.csv.parse(historique, function(d) {
        return {
            name:d.name, 
            relation:d.relation,
            parent:+d.parent
        };
    });
        // *********** Convert flat data into a nice tree ***************
    // create a name: node map
    var dataMap = data.reduce(function(map, node) {
	    map[node.name] = node;
	    return map;
    }, {});
    // create the tree array
    
    
    var treeData = [];
    data.forEach(function(node) {
	    // add to parent
	    var parent = dataMap[node.parent];
	    if (parent) {
		    // create child array if it doesn't exist
		    (parent.children || (parent.children = []))
			    // add node to child array
			    .push(node);
	    } else {
		    // parent is null or missing
		    treeData.push(node);
	    }
    });
    
    root = treeData[0];
    
    //console.log(JSON.stringify(treeData, null, 3));
    
    return JSON.stringify(treeData, null, 3);
}





//construit une variable au format CSV sous la forme "name,relation,parent"
function updateCSV(objet1, objet2){

    if(historique === "name,relation,parent"){
        historique += "\n";
        historique += elem + "," + null + "," + null;
        
    }
    var new_line = objet2.name + "," + objet1.name + "," + elem;
    if(searchCSV(objet1, objet2)){
        historique += "\n";
        historique += new_line;
    }

    
}



///reforme l'historique après chargement de fichier
function buildHistorique(csv){
    historique += "\n";
    for(var i = 0; i < csv.length; i++){
        var new_line = csv[i].name + "," + csv[i].relation + "," + csv[i].parent;
        //console.log(new_line);
        historique += new_line;
        historique += "\n";
    }
    //console.log(historique);
}




>>>>>>> 5c2b32b6e4191246d2b0a8d8cfc60144af30843c
// check que la ligne n'est pas déja presente
function searchCSV(objet1, objet2){

    var new_line = objet2.name + "," + objet1.name + "," + elem;
    
    
    var allTextLines = historique.split(/\r\n|\n/);
    
    for (var i=0; i<allTextLines.length; i++) {
        var lines = allTextLines[i];
        if(lines == new_line){
            return false;
        }
    }
    return true;
}

function DisplayCSV(){

    d3.select("#info").selectAll("div").selectAll("p").remove();
    
    var allTextLines = historique.split(/\r\n|\n/);
    
    for (var i=0; i<allTextLines.length; i++) {
        var lines = allTextLines[i];
        d3.select("#info").attr("height", "20px").selectAll("div")
          .append("p").text(lines);
    }

    
    
}

}





function download_csv() {

    var hiddenElement = document.getElementById("download");
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(historique);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Historique.csv';
    hiddenElement.click();
    

}




