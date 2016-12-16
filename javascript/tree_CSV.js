//toujours le sujet utilisé dans un triplé 
var elem;

d3.select("#histo").selectAll("svg").remove();
    


// load the external data
function Tree(){

    d3.select("#histo").selectAll("svg").remove();
    
    // ************** Generate the tree diagram	 *****************
   
        var svg = d3.select("#histo")
                    .append("svg")
                        .attr("width", '100%')
                        .attr("height", 500)
                        .attr("transform", "translate(80,0)");
                        
                        
        var width = 500-20,
        height = 500;
        

	
    var i = 0;

    var tree = d3.layout.tree()
	    .size([height, width]);

    var diagonal = d3.svg.diagonal()
	    .projection(function(d) { return [d.y, d.x]; });

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
      
      
      //console.log(root);
      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
	      links = tree.links(nodes);

      // Normalize for fixed-depth.
      //nodes.forEach(function(d) { d.y = d.depth * 80; });

      // Declare the nodes
      var node = svg.selectAll("g.node")
	      .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter the nodes.
      var nodeEnter = node.enter().append("g")
	      .attr("class", "node")
	      .attr("transform", function(d) { 
		      return "translate(" + d.y + "," + d.x + ")"; });

      nodeEnter.append("circle")
	      .attr("r", 10)
	      .on("click", clickNode);

      nodeEnter.append("text")
	      .attr("x", function(d) { 
		      return d.children || d._children ? -13 : 13; })
	      .attr("dy", ".35em")
	      .attr("text-anchor", function(d) { 
		      return d.children || d._children ? "end" : "start"; })
	      .text(function(d) { return d.name; })
	      .style("fill-opacity", 1);

      // Declare the link
      var link = svg.selectAll("path.link")
	      .data(links, function(d) { return d.target.id; });

      // Enter the links.
      link.enter().insert("path", "g")
	      .attr("class", "link")
	      .attr("d", diagonal);
}

function clickNode(d){
    //console.log(d.name);
    ChargerFile(d);
    
    createVisualization();
}

function ChargerTree(file){
    d3.csv(file, function(error, csv) {
        var json = CSV_JSON(csv);
        Tree();
        DisplayCSV();
    });
}

