
// Main function to draw and set up the visualization, once we have the data.
function createVisualization2() {
  d3.select("#container").selectAll("path").remove();
  d3.select("#container").selectAll(".centre").remove();
  d3.select("#container").selectAll(".arcText").remove(); 
  d3.selectAll("#trail").remove(); 
  d3.select("#chart").selectAll("svg").remove(); 
  
  
    var width = 1000,
        height = 700,
        radius = (Math.min(width, height) / 2) - 10;

    var formatNumber = d3.format(",d");

    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.sqrt()
        .range([0, radius]);

    var color = d3.scale.category20c();

    var partition = d3.layout.partition()
        .value(function(d) { return d.size; });

    var arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

    var svg = d3.select("#chart").append("svg:svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("id", "container")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");





  
  
    d3.json(filename, function(error, json) {
    
        elem = json.name;
        //console.log(JSON.stringify(root, null, 3));
        //console.log(elem);
    
      if (error) throw error;
      

          root = partition.nodes(json);
      
      
      svg.selectAll("path")
          .data(root)
        .enter().append("path")
          .attr("id", function(d,i) { return "Arc_"+i; }) //Give each slice a unique ID
          .attr("d", arc)
          .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
          .on("click", click);
          
       svg.selectAll(".arcText")
          .data(root)
          .enter()
          .append("svg:text")
          .attr("class", "arcText")
          .style("text-anchor","middle")
          .attr("dy", 20) //Move the text down
          .append("textPath")
          .attr("startOffset","25%")
          .attr("xlink:href",function(d,i){return "#Arc_"+i;}) 
          .text(function(d){return d.name;})
          .on("click", click);
    });

    

    var feuille = false;
    
    if(elem !== ""){Tree();}
    
    function click(d) {
      svg.transition()
          .duration(750)
          .tween("scale", function() {
            var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                yd = d3.interpolate(y.domain(), [d.y, 1]),
                yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
            return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
          })
        .selectAll("path")
          .attrTween("d", function(d) { return function() { return arc(d); }; });
          
        var i = d.chidren;
        //console.log(d);
     /*   
        if(d.children.length < 1){
            NewSearch(d)
        }
 */       
        if(feuille == false){
            if(d.children || d.children.length < 1){
                feuille = true;
            }
        }else{
            NewSearch(d);
            feuille = false;
        }

    }
    
    function NewSearch(d){
          var i = d.chidren;
          if(d.children.length < 1){
            updateCSV(d.parent, d);
            elem = d.name;
            //console.log(d.children.length);
            ChangeFile();
          }
  
       // console.log(d.name);
        DisplayCSV();
        createVisualization2();
    }
    
    function isParentOf(p, c) {
      if (p === c) return true;
      if (p.children) {
        return p.children.some(function(d) {
          return isParentOf(d, c);
        });
      }
      return false;
    }
        
  
  
}
