/*
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
          .attr("text-anchor", function(d) {
		        return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
		      })
          .attr("dy", 20) //Move the text down
          .append("textPath")
          .attr("startOffset","25%")
          .attr("xlink:href",function(d,i){return "#Arc_"+i;}) 
          .text(function(d){return d.name;})
          .on("click", click).each("end", function(e) {
		          d3.select(this).style("visibility", isParentOf(d, e) ? null : "hidden");
		        });;
      
 
          
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
          .attrTween("d", function(d) { return function() { return arc(d); }; })
        .selectAll(".arcText")
            .style("visibility", function(e) {
		          return isParentOf(d, e) ? null : d3.select(this).style("visibility");
		        });
          
          
          
          
       
          
          
        var i = d.chidren;
        //console.log(d);
       
        if(d.children.length < 1){
            NewSearch(d)
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

*/

// Main function to draw and set up the visualization, once we have the data.
function createVisualization2() {
      d3.select("#container").selectAll("path").remove();
      d3.select("#container").selectAll(".centre").remove();
      d3.select("#container").selectAll(".arcText").remove(); 
      d3.selectAll("#trail").remove(); 
      d3.select("#chart").selectAll("svg").remove(); 
      d3.select("#chart").selectAll(".tooltip").remove(); 
      
    var width = 960,
        height = 700,
        radius = Math.min(width, height) / 2;

    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.linear()
        .range([0, radius]);

    var color = d3.scale.category20c();

    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

    var partition = d3.layout.partition()
        .value(function(d) { return d.size; });

    var arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });
        
    var tooltip = d3.select("#chart").append("div")
                    .attr("class", "tooltip")
                    .attr("id", "infobulle")
                    .style("position", "absolute")
                    .style("z-index", "10")
                    .style("opacity", 0);
                    
      function format_name(d) {
        var name = d.name;
        return  '<b>' + name + '</b>';
    }

    d3.json(filename, function(error, root) {
      elem = root.name;
    
      var g = svg.selectAll("g")
          .data(partition.nodes(root))
        .enter().append("g");

      var path = g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
        .on("click", click)
        .on("mouseover", function(d) {
          tooltip.html(function() {
              var name = format_name(d);
              return name;
         });
          return tooltip.transition()
            .duration(50)
            .style("opacity", 0.9);
        })
        .on("mousemove", function(d) {
          return tooltip
            .style("top", (d3.event.pageY-10)+"px")
            .style("left", (d3.event.pageX+10)+"px");
        })
        .on("mouseout", function(){return tooltip.style("opacity", 0);});

      var text = g.append("text")
        .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
        .attr("x", function(d) { return y(d.y); })
        .attr("dx", "6") // margin
        .attr("dy", ".35em") // vertical-align
        .text(function(d) { return d.name; })
        .on("click",click);



    
    if(elem !== ""){Tree();}
    
    
      function click(d) {
        // fade out all text elements
        text.transition().attr("opacity", 0);

        path.transition()
          .duration(750)
          .attrTween("d", arcTween(d))
          .each("end", function(e, i) {
              // check if the animated element's data e lies within the visible angle span given in d
              if (e.x >= d.x && e.x < (d.x + d.dx)) {
                // get a selection of the associated text element
                var arcText = d3.select(this.parentNode).select("text");
                // fade in the text element and recalculate positions
                arcText.transition().duration(750)
                  .attr("opacity", 1)
                  .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
                  .attr("x", function(d) { return y(d.y); });
              }
          });
          
          
        var i = d.chidren;
        //console.log(d);
       
        if(d.children.length < 1){
            NewSearch(d)
        }
      }
    });

    d3.select(self.frameElement).style("height", height + "px");

    // Interpolate the scales!
    function arcTween(d) {
      var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
          yd = d3.interpolate(y.domain(), [d.y, 1]),
          yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
      return function(d, i) {
        return i
            ? function(t) { return arc(d); }
            : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
      };
    }

    function computeTextRotation(d) {
      return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
    }
    
    
    function NewSearch(d){
          var i = d.chidren;
          if(d.children.length < 1){
            updateCSV(d.parent, d);
            elem = d.name;
            //console.log(d.children.length);
            ChangeFile();
          }
  
       //console.log(historique);
        DisplayCSV();
        createVisualization2();
    }
}
