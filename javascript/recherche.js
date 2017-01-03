var objetrecherche;
//nom de fichier JSON de reférence
var filename = "";

//console.log(objetrecherche);

//determine si un fichier existe deja à l'adresse url
function fileExists(url) {
    if(url){
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.status==200;
    } else {
        return false;
    }
}

function Search(){
    //console.log("test");
    //emplacement pour appel fonction de creation du fichier JSON

    //re-initialisation
    //ChangeFile()
    
    //filename = "flare.json"
    //filename = "test.json"

    // x = chemin vers le fichier json
    var x = "json/" + document.getElementById("recherche").value.replace(" ","_");
    x += ".json";

    

    //si le fichier existe pas
    if (fileExists(x) == false) 
    {
        // appel en ajax pour le crée 
       // filename = "json/Europe.json"; // solution temporaire

        $("#loading").append("<p> recherche en cours  <img src=\"../picture/load.gif\" height=\"42\" width=\"42\" > </p> ");

       
        $.ajax({
          type: 'POST',
          url:   '../main.php',
          data: 'search=' + document.getElementById("recherche").value,
          async:false
        });

         $("#loading").remove();
    }

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

    var file = "json/" + elem.replace(" ","_") + ".json";

    //si le fichier existe pas
    if (fileExists(file) == false) 
    {
        // appel en ajax pour le crée 
       // filename = "json/Europe.json"; // solution temporaire

      $("#loading").append("<p> recherche en cours  <img src=\"../picture/load.gif\" height=\"42\" width=\"42\" > </p> ");

        $.ajax({
          type: 'POST',
          url:   '../main.php',
          data: 'search=' + elem,
          async:false
        });

       $("#loading").remove();
    }

    filename = file;
    
}

//fonction temporaire pour effectuer des tests
function ChargerFile(d){
    filename = d.name + ".json";
}
