var objetrecherche;

console.log(objetrecherche);

function Search(){

    //emplacement pour appel fonction de creation du fichier JSON

    //re-initialisation
    ChangeFile()

    
    historique = "name,relation,parent";
    elem = "";

    createVisualization();
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
