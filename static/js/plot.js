var select = document.getElementById("samples");
select.length = 0;

<<<<<<< HEAD
var names_url = "/names"
=======
var names_url = "/names"
>>>>>>> 89d991db68b36c4c656a6e08193f1d78765934af

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

<<<<<<< HEAD


function optionChanged() {
    var selection = document.getElementById('samples');
    var selValue = selection.value;
    var sample_url = "/samples/" + selValue;
=======
function optionChanged() {
    var selection = document.getElementById('samples');
    var selValue = selection.value;
    var sample_url = "/samples/" + selValue;
>>>>>>> 89d991db68b36c4c656a6e08193f1d78765934af
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

<<<<<<< HEAD

=======
>>>>>>> 89d991db68b36c4c656a6e08193f1d78765934af
 function findMetadata() {
    var selection = document.getElementById('samples');
    var selValue = selection.value;
    var metaList = document.getElementById('metadataList');
<<<<<<< HEAD
    var meta_url = "/metadata/" + selValue;
=======
    var meta_url = "/metadata/" + selValue;
>>>>>>> 89d991db68b36c4c656a6e08193f1d78765934af
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
<<<<<<< HEAD
    var sample_url = "/samples/" + selValue;
=======
    var sample_url = "/samples/" + selValue;
>>>>>>> 89d991db68b36c4c656a6e08193f1d78765934af
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
<<<<<<< HEAD
 
=======
 
>>>>>>> 89d991db68b36c4c656a6e08193f1d78765934af
