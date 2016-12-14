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
