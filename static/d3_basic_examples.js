/**
 * Created by Simon on 24/11/2016.
 */

$(function () {
    console.log('jquery is working!');
    draw_circle();
    draw_circle_with_variables();
});

function draw_circle() {
    d3.select("body")
        .append("svg")
        .attr("width", 50)
        .attr("height", 50)
        .append("circle")
        .attr("cx", 25)
        .attr("cy", 25)
        .attr("r", 25)
        .style("fill", "purple")
}

function draw_circle_with_variables() {
    var w = 800;
    var h = 300;
    var padding = 2;
    var dataset = [65, 100, 15, 45, 125]
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return (i * (w/ dataset.length));
        })
        .attr("y", function(d){
            return h - d;
        })
        .attr("width", w / dataset.length - padding)
        .attr("height", function(d){
            return d;
        });
}
