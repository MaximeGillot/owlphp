var objetrecherche;

console.log(objetrecherche);

function Search(){

    //emplacement pour appel fonction de creation du fichier JSON

    //re-initialisation
    ChangeFile()
    //filename == "test.json"

    
    historique = "name,relation,parent";
    elem = "";

    createVisualization();
}



function ChargerCSV(){

    var f = document.getElementById("myFile").value;
    //console.log(f);
    //var file = f;

    
    createVisualizationCSV(f);
    //TreeCSV(f);
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
}
