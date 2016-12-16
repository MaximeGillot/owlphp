var objetrecherche;
//nom de fichier JSON de reférence
var filename = "";

//console.log(objetrecherche);

function Search(){
    //console.log("test");
    //emplacement pour appel fonction de creation du fichier JSON

    //re-initialisation
    //ChangeFile()
    
    //filename = "flare.json"
    //filename = "test.json"
    
    var x = document.getElementById("recherche").value;
    x += ".json";
    filename = x;

    
    historique = "name,relation,parent";
    elem = "";
    //console.log(filename);
    
    DisplayCSV();
    ChoosingSun();
    
    Tree();
}

function ChoosingSun(){
    if(document.getElementById('sun1').checked) {
        createVisualization();
    }else if(document.getElementById('sun2').checked) {
        createVisualization2();
    }
}

function ChargerCSV(){

    var f = document.getElementById("myFile").value;
    
    d3.select("#container").selectAll("path").remove();
    d3.select("#container").selectAll(".centre").remove();
    d3.select("#container").selectAll(".arcText").remove(); 
    d3.selectAll("#trail").remove(); 

    historique = "name,relation,parent";
    elem = "";
    
    ChargerTree(f);
}


//fonction temporaire pour effectuer des tests
function ChangeFile(){

    if(filename == ""){
        filename = "Europe.json";
    }else if(filename == "Europe.json"){
        filename = "France.json";
    }else if(filename == "France.json"){
        filename = "Bretagne.json";
    }

    /*
    var file = elem + ".json";
    filename = file;
    */
}



//fonction temporaire pour effectuer des tests
function ChargerFile(d){
    filename = d.name + ".json";
}
