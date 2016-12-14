        
var elem = "";


function Tree() {
    //console.log(element);
    //initJSON(elem);
    d3.select("#histo").selectAll("svg").remove();
    
    // ************** Generate the tree diagram	 *****************
    var svg = d3.select("#histo").append("svg").attr("width", 500).attr("height", 300),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        g = svg.append("g").attr("transform", "translate(60,0)");



    
    var tree = d3.cluster()
        .size([height, width - 160]);

    var stratify = d3.stratify()
        .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

    //d3.json("france.json", function(error, treeData) {

    treeData = nodes_graphe;
    //treeData = JSON.parse(nodes_graphe);
    //console.log(JSON.stringify(treeData));
      //if (error) throw error;

      var root = d3.hierarchy(treeData);
      tree(root);

      var link = g.selectAll(".link")
          .data(root.descendants().slice(1))
        .enter().append("path")
          .attr("class", "link")
          .attr("d", function(d) {
            return "M" + d.y + "," + d.x
                + "C" + (d.parent.y + 100) + "," + d.x
                + " " + (d.parent.y + 100) + "," + d.parent.x
                + " " + d.parent.y + "," + d.parent.x;
          });

      var node = g.selectAll(".node")
          .data(root.descendants())
        .enter().append("g")
          .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
          .attr("id", function(d,i){return "node"+i;})
          .on("mouseover", mouseover_tree)
          .on("mouseleave", mouseleave_tree)
          .attr("transform", function(d) { 
            return "translate(" + d.y + "," + d.x + ")"; 
          });

      node.append("circle")
          .attr("class", function(d,i){return "node"+i;})
          .attr("r", 10);

      node.append("text")
          .attr("class", function(d,i){return "node"+i;})
          .attr("dy", function(d) { return d.children ? -8 : 0; })
          .attr("x", function(d) { return d.children ? 4 : 12; })
          .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
          .text(function(d) { 
            return d.data.name;
          })
          .style("opacity", 0);
    //});


}



/*

function Tree() {

    d3.select("#histo").selectAll("svg").remove();
    
    
    var treeData = nodes_graphe;
    console.log(JSON.stringify(treeData));
    //console.log(treeData.name);


    var vis = d3.select("#histo").append("svg:svg")
                .attr("width", 500)
                .attr("height", 300)
                .append("svg:g")
                .attr("transform", "translate(40, 0)");

    var tree = d3.layout.tree()
                 .size([300,150]);

    var diagonal = d3.svg.diagonal()
                     .projection(function(d) { return [d.y, d.x]; });

    var nodes = tree.nodes(treeData);
    var link = vis.selectAll("pathlink")
                  .data(tree.links(nodes))
                  .enter().append("svg:path")
                  .attr("class", "link")
                  .attr("d", diagonal);

    var node = vis.selectAll("g.node")
                  .data(nodes)
                  .enter().append("svg:g")
                  .on("mouseover", mouseover_tree)
                  .on("mouseleave", mouseleave_tree)
                  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

    node.append("svg:circle")
        .attr("r", 4.5);

    node.append("svg:text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) { 
            return d.name;
          })
        .style("opacity", 0);
        
}

*/



// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover_tree(d) {
      
  d3.select(this).selectAll("text").style("opacity", 1);
            

}

function format_description_tree(d) {
      return  '<b>' + d.name + '</b>';
}



// Restore everything to full opacity when moving off the visualization.
function mouseleave_tree(d) {

    d3.select(this).selectAll("text").style("opacity", 0);
}



