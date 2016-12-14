

// Dimensions of sunburst.
var width = 1000;
var widthc = width;
var height = 700;
var heightc = height;
var radius = Math.min(width, height) / 2;
var color = d3.scale.category20c();

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = { w: 125, h: 50, s: 3, t: 50 };

// make `colors` an ordinal scale
var colors = d3.scale.category20c();

// Total size of all segments; we set this later, after loading the data.
var totalSize = 0; 

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.layout.partition()
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return d.size; });//a modifier suivant le fichier en entrée

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });


//Tooltip description
var tooltip = d3.select("#chart")
    .append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("opacity", 0);

var nodes;

//nom de fichier JSON de reférence
var filename = "";


// Main function to draw and set up the visualization, once we have the data.
function createVisualization() {
  d3.select("#container").selectAll("path").remove();
  d3.select("#container").selectAll(".centre").remove();
  d3.select("#container").selectAll(".arcText").remove(); 
  d3.selectAll("#trail").remove(); 
  
  
    //console.log(filename);
    d3.json(filename, function(error, json) {
          elem = json.name; //initJSON(elem);
            
          // Basic setup of page elements.
          initializeBreadcrumbTrail();
          
          // Bounding circle underneath the sunburst, to make it easier to detect
          // when the mouse leaves the parent g.
          vis.append("svg:circle")
              .attr("r", radius)
              .style("opacity", 0).append("path");

          // For efficiency, filter nodes to keep only those large enough to see.
          nodes = partition.nodes(json)
              .filter(function(d) {
              return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
              });        

       
          var path = vis.data([json]).selectAll("path")
              .data(nodes)
              .enter()
              .append("svg:path")
                .attr("id", function(d,i) { return "Arc_"+i; }) //Give each slice a unique ID
                .attr("class", "Arc")
                //.text(function(d){return d.name;})
                .attr("display", function(d) { return d.depth ? null : "none"; })
                .attr("d", arc)
                .attr("fill-rule", "evenodd")
                .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
                .style("opacity", 1)
                .on("mouseover", mouseover)
                .on("mousemove", mouseMoveArc)
                .on("click", click).each(stash);
  
           var text = vis.selectAll(".arcText")
              .data(nodes)   
              .enter()
              .append("text")
              .attr("class", "arcText")
              .style("text-anchor","middle")
              //.attr("x", 5) //Move the text from the start angle of the arc
              .attr("dy", 18) //Move the text down
              .append("textPath")
              .attr("startOffset","25%")
              .attr("xlink:href",function(d,i){return "#Arc_"+i;})    
              .text(function(d){return d.name;});
                
           path.transition()
              .duration(750)
              .attrTween("d", arcTween);
              


          // Add the mouseleave handler to the bounding circle.
          d3.select("#container").on("mouseleave", mouseleave);

          // Get total size of the tree = value of root node from partition.
          totalSize = path.node().__data__.value;
          

    });
    
    
    //console.log(elem);
    if(elem !== ""){Tree();}
    
 };
 
 
 //actions when click 
function click(d)
{
  d3.select("#container").selectAll("path").remove();
  d3.select("#container").selectAll(".centre").remove();
  d3.select("#container").selectAll(".arcText").remove(); 
  d3.selectAll("#trail").remove(); 
  
  
  //var sequenceArray = getAncestors(d);
  
    //verifie que l'on prend un objet d et non une relation d
  if(d.children){
  }else{
    updateCSV(d.parent, d);
    //elem = d.name;
    ChangeFile();
  }
  
  DisplayCSV();
  createVisualization();
    
}

function arcTween(a){
                    var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
                    return function(t) {
                        var b = i(t);
                        a.x0 = b.x;
                        a.dx0 = b.dx;
                        return arc(b);
                    };
                };

function stash(d) {
                    d.x0 = 0; // d.x;
                    d.dx0 = 0; //d.dx;
                }; 

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {

  var sequenceArray = getAncestors(d);
  updateBreadcrumbs(sequenceArray);

  // Fade all the segments.
  d3.selectAll("path")
      .style("opacity", 0.3);

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);
      
  tooltip.html(format_description(d));
  tooltip.transition()
            .duration(50)
            .style("opacity", 0.9);
            
  updateBreadcrumbs(sequenceArray);
}

function format_description(d) {
      return  '<b>' + d.name + '</b>';
}

d3.select(self.frameElement).style("height", height + "px");

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail")
      .style("visibility", "hidden");

  // Deactivate all segments during transition.
  d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll("path")
      .transition()
      .duration(1000)
      .style("opacity", 1)
 ;/*     .each("end", function() {
              d3.select(this).on("mouseover", mouseover).on("mousemove", mouseMoveArc);
            });*/
    tooltip.style("opacity", 0);
}

function mouseMoveArc (d) {
          return tooltip
            .style("top", (d3.event.pageY-10)+"px")
            .style("left", (d3.event.pageX+10)+"px");
}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}

function initializeBreadcrumbTrail() {
  // Add the svg area.
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", widthc)
      .attr("height", 50)
      .attr("id", "trail");
  // Add the label at the end, for the percentage.
  /*trail.append("svg:text")
    .attr("id", "endlabel");
    //.style("fill", "#000");
    */
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h ));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h ));
  }
  return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray) {

  // Data join; key function combines name and depth (= position in sequence).
  var g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.name + d.depth; });
      


  // Add breadcrumb and label for entering nodes.
  var entering = g.enter().append("svg:g");
                  //.attr("width", 50);

      
  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return color((d.children ? d : d.parent).name); });

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });

  // Set position for entering and updating nodes.
  g.attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Remove exiting nodes.
  g.exit().remove();

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}




//createVisualization();
