var select = document.getElementById("samples");
select.length = 0;

var names_url = "/names"

var defaultOption = document.createElement('option');
defaultOption.text = 'Sample Names';

select.add(defaultOption);
select.selectedIndex = 0;

Plotly.d3.json(names_url, function(error, response){
    if (error) return console.warn(error);
    var names = response;
    for (var i = 0; i < names.length; i++) {
        var opt = names[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
}});

function optionChanged() {
    var selection = document.getElementById('samples');
    var selValue = selection.value;
    var sample_url = "/samples/" + selValue;
    Plotly.d3.json(sample_url, function(error, response){
        if (error) return console.warn(error);
        var otus = response[0]["otu_ids"];
        var samps = response[0]["sample_values"];
        console.log(samps.slice(0,10))
        var data = [{
            values: samps.slice(0,10),
            labels: otus.slice(0,10),
            type: 'pie'
        }];
        var layout = {
            title: "Top 10 sample values and OTU counts"
        }
        Plotly.newPlot('plots',data, layout);
    })
}

 function findMetadata() {
    var selection = document.getElementById('samples');
    var selValue = selection.value;
    var metaList = document.getElementById('metadataList');
    var meta_url = "/metadata/" + selValue;
    Plotly.d3.json(meta_url, function(error, response){
    if (error) return console.warn.apply(error);
    var data = Object.entries(response[0]);
	console.log(data);
    var el = d3.select('#metadataList');
    var selection = el.selectAll('p').data(d3.values(data));
    selection.exit().remove();
    selection.enter().append('p').merge(selection).text(data => `${Object.values(data)[0]}: ${Object.values(data)[1]}`);
    });
};

function createBubble() {
    var selection = document.getElementById('samples');
    var selValue = selection.value;
    var sample_url = "/samples/" + selValue;
    Plotly.d3.json(sample_url, function(error, response){
        if (error) return console.warn(error);
        var otus = response[0]["otu_ids"];
        var samps = response[0]["sample_values"];
        var traceA = {
            type:"scatter",
            mode:"markers",
            x: otus,
            y: samps,
            marker : {
                color: otus,
                colorscale: [[0,'rgb(0,255,0)'],[0.5,'rgb(255,0,0)'],[1,'rgb(0,0,255)']],
                cmin: 0,
                cmax: Math.max(samps),
                size:samps,
                sizemode: 'area',
                sizeref: 0.07
            }
        };
        var data = [traceA];
        var layout = {
            title: "Bubble Plot of Sample Values and OTU IDs",
            xaxis: {
                title:"OTU IDs"
            },
            yaxis: {
                title:"Sample Values"
            }
        }
        Plotly.newPlot('bubblePlot', data, layout);
    })
};

/**
******* BONUS Solution *******
**/
function buildGauge() {
    var selection = document.getElementById('samples');
    var selValue = selection.value;
    var sample_url = "/wfreq/" + selValue;
    Plotly.d3.json(sample_url, function(error, response){
        if (error) return console.warn(error);
        // Enter the washing frequency between 0 and 180
        var level = response*20;
        // Trig to calc meter point
        var degrees = 180 - level,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);
        var data = [{ type: 'scatter',
        x: [0], y:[0],
            marker: {size: 12, color:'850000'},
            showlegend: false,
            name: 'Freq',
            text: level,
            hoverinfo: 'text+name'},
        { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        textinfo: 'text',
        textposition:'inside',
        marker: {
            colors:[
                'rgba(0, 105, 11, .5)', 'rgba(10, 120, 22, .5)',
                'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                'rgba(240, 230, 215, .5)', 'rgba(255, 255, 255, 0)']},
        labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
        }];
        var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],
        title: '<b>Washing Frequency</b> <br> Weekly Scrubs',
        height: 500,
        width: 500,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };
        var GAUGE = document.getElementById('gauge');
        Plotly.newPlot(GAUGE, data, layout);
    });
}
