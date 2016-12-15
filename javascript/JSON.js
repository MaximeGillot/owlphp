var nodes_graphe = [];




function updateJSON(objet1, objet2){
    //console.log(objet1.name);
    //console.log(objet2.name);
    
      nodes_start = [
            {
                "name":objet1,
                "children":[]
            }
        ];
    
    if(nodes_graphe == undefined || nodes_graphe.length == 0){
        nodes_graphe = nodes_start;
    }
    
    var inter_tree = [
        {
            "name":elem,
            "children":[
                {
                    "name":objet1.name,
                    "children":[
                            {
                                "name":objet2.name,
                                "children":[]
                            }
                        ]
                }
            ]
        }
    ];

    var result=[];
    Object.keys(nodes_graphe).forEach((key) => result[key] = nodes_graphe[key]);
    Object.keys(inter_tree).forEach((key) => result[key] = inter_tree[key]);
    
    
    //var result = nodes_graphe.concat(inter_tree);

  console.log("result");
  console.log(JSON.stringify(result));
  
  
    nodes_graphe = result;

    
}

function initJSON(objet1){

    //console.log(objet1);
    //console.log(JSON.stringify(nodes_graphe));
      nodes_start = [
            {
                "name":objet1,
                "children":[]
            }
        ];
    
    if(nodes_graphe == undefined || nodes_graphe.length == 0){
        nodes_graphe = nodes_start;
    }


    //console.log(JSON.stringify(nodes_graphe));
}
