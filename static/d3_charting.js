/**
 * Created by Simon on 24/11/2016.
 */

$(function () {
    console.log('jquery is working!');
    draw_scatter_chart();
});

function draw_bar_chart() {
    var w = 300;
    var h = 500;
    var padding = 2;
    var dataset = [5, 55, 35, 80, 100];
    var svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return i * (w / dataset.length);
        })
        .attr("y", function (d) {
            return h - (d * 5);
        })
        .attr("width", w / dataset.length - padding)
        .attr("height", function (d) {
            return d * 5;
        })
        .attr("fill", function (d) {
            return "rgb(" + (d * 10) + ",0,0)";
        });
}

function draw_bar_chart_json_attributes() {
    var w = 300;
    var h = 500;
    var padding = 2;
    var dataset = [5, 55, 35, 80, 100];
    var svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h);

    function colorPicker(v) {
        if (v <= 20) {
            return "#666666"
        }
        else if (v > 80) {
            return "#FF0033"
        }
    }

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr({
            x: function (d, i) {
                return i * (w / dataset.length);
            },
            y: function (d) {
                return h - (d * 5);
            },
            width: w / dataset.length - padding,
            height: function (d) {
                return d * 5;
            },
            fill: function (d) {
                return colorPicker(d);
            }
        })
}

function draw_bar_chart_with_labels() {
    var w = 500;
    var h = 520;
    var padding = 2;
    var dataset = [5, 55, 35, 80, 100, 45, 22, 72, 68, 35, 97];
    var svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h);

    function colorPicker(v) {
        if (v <= 20) {
            return "#666666"
        }
        else if (v > 80) {
            return "#FF0033"
        }
    }

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr({
            x: function (d, i) {
                return i * (w / dataset.length);
            },
            y: function (d) {
                return h - (d * 5);
            },
            width: w / dataset.length - padding,
            height: function (d) {
                return d * 5;
            },
            fill: function (d) {
                return colorPicker(d);
            }
        })
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr({
            "text-anchor": "middle",
            x: function (d, i) {
                return i * (w / dataset.length) + (w / dataset.length - padding) / 2;
            },
            y: function (d) {
                return h - (d * 5) + 15;
            },
            "font-family": "calibri",
            "fill": "#ffffff"
        });
}

function draw_line_chart() {
    var h = 350;
    var w = 400;

    var monthlySales = [
        {"month": 10, "sales": 100},
        {"month": 20, "sales": 130},
        {"month": 30, "sales": 250},
        {"month": 40, "sales": 300},
        {"month": 50, "sales": 265},
        {"month": 60, "sales": 225},
        {"month": 70, "sales": 180},
        {"month": 80, "sales": 120},
        {"month": 90, "sales": 145},
        {"month": 100, "sales": 130}

    ];

    var lineFun = d3.svg.line()
        .x(function (d) {
            return d.month * 3;
        })
        .y(function (d) {
            return h - d.sales;
        })
        .interpolate("linear");

    var svg =
        d3.select("body").append("svg").attr({
            width: w, height: h
        });

    var viz = svg.append("path")
        .attr({
            d: lineFun(monthlySales),
            "stroke": "purple",
            "stroke-width": 2,
            "fill": "none"
        })

    //add labels
    var labels = svg.selectAll("text")
        .data(monthlySales)
        .enter()
        .append("text")
        .text(function (d) {
            return d.sales;
        })
        .attr({
                x: function (d) {
                    return d.month * 3 - 25;
                },
                y: function (d) {
                    return h - d.sales;
                },
                "font-size": "12px",
                "font-family": "sans-serif",
                "fill": "#666666",
                "text-anchor": "start",
                "dy": ".35em",
                "font-weight": function (d, i) {
                    if (i == 0 || i == (monthlySales.length - 1)) {
                        return "bold";
                    }
                    else {
                        return "normal"
                    }
                }
            }
        )
}

function draw_scatter_chart() {
    var h = 350;
    var w = 400;

    var monthlySales = [
        {"month": 10, "sales": 100},
        {"month": 20, "sales": 130},
        {"month": 30, "sales": 250},
        {"month": 40, "sales": 300},
        {"month": 50, "sales": 265},
        {"month": 60, "sales": 225},
        {"month": 70, "sales": 180},
        {"month": 80, "sales": 120},
        {"month": 90, "sales": 145},
        {"month": 100, "sales": 130}

    ];

    //KPI
    function salesKPI(d) {
        if (d >= 250) {
            return "#33cc66"
        } else if (d < 250) {
            return "#666666";
        }
    }

    function showMinMax(ds, col, val, type) {
        var max = d3.max(ds, function (d) {
            return d[col];
        });
        var min = d3.min(ds, function (d) {
            return d[col];
        });

        if (type == 'minmax' && (val == max || val == min)) {
            return val;
        } else {
            if (type == 'all') {
                return val
            }
        }
    }

//create svg
    var svg = d3.select("body").append("svg").attr({width: w, height: h});

//add dots
    var dots = svg.selectAll("circle")
        .data(monthlySales)
        .enter()
        .append("circle")
        .attr({
            cx: function (d) {
                return d.month * 3;
            },
            cy: function (d) {
                return h - d.sales;
            },
            r: 5,
            "fill": function (d) {
                return salesKPI(d.sales);
            }
        })

//add labels
    var labels = svg.selectAll("text")
        .data(monthlySales)
        .enter()
        .append("text")
        .text(function (d) {
            return showMinMax(monthlySales, 'sales', d.sales, 'minmax');
        })
        .attr({
            x: function (d) {
                return (d.month * 3) - 25;
            },
            y: function (d) {
                return h - d.sales;
            },
            "font-size": "12px",
            "font-family": "sans-serif",
            "fill": "#666666",
            "text-anchor": "start"
        })
}