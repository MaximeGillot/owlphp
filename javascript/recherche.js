var objetrecherche;

console.log(objetrecherche);

<<<<<<< HEAD
function Search(){
=======
function Search(subject){
>>>>>>> 5c2b32b6e4191246d2b0a8d8cfc60144af30843c

    //emplacement pour appel fonction de creation du fichier JSON

    //re-initialisation
<<<<<<< HEAD
    ChangeFile()
=======
    //ChangeFile()
    //filename == "test.json"
>>>>>>> 5c2b32b6e4191246d2b0a8d8cfc60144af30843c

    
    historique = "name,relation,parent";
    elem = "";

<<<<<<< HEAD
    createVisualization();
}


//fonction temporaire pour effectuer des tests
function ChangeFile(){
    if(filename == ""){
=======
    var filename = '../json_files/'+subject;

    if(filename){
        /*
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.innerHTML = this.responseText;
        }
        };
        xhttp.open("GET", "javascript/index.html", true);
        xhttp.send({'filename':filename});
        */
        createVisualization(filename);
    }else{
        createVisualization();
    }
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
    if(filename == ""){ // Il est defini ou filename ?
>>>>>>> 5c2b32b6e4191246d2b0a8d8cfc60144af30843c
        filename = "Europe.json";
    }else if(filename == "Europe.json"){
        filename = "France.json";
    }else if(filename == "France.json"){
        filename = "Bretagne.json";
    }
}
<<<<<<< HEAD
=======
/*
function ajax_mtree(){
    var opts = {
        method: 'GET',
        body: 'json',
        headers: {}
    };
    fetch('/get-data', opts).then(function (response) {
    return response.json();
    }).then(function (body) {
        // load
    });
}*/
>>>>>>> 5c2b32b6e4191246d2b0a8d8cfc60144af30843c
