//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TASK 1: Use the D3 library to read in samples.json from the URL "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json".

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

    // Console log the data to ensure the object is displayed in the console

d3.json(url).then(function (data) {
    console.log(data)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TASK 2: Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual

    // Initialise the dropdown menu function
    // Select the element on the dashboard for the dropdown menu - When selecting a new value from the dataset, HTML will prompt "optionChanged" to a new value (this.value)

function init() {

let dropdownMenu = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;
        sampleNames.forEach((Name) => {
            dropdownMenu
            .append("option")
            .text(Name)
        });
    })

buildChart(940);
buildBubble(940);
};

init();

function optionChanged(newSample) {

         buildChart(newSample);
         buildBubble(newSample);

    };

// Initialise the dropdown menu

function buildChart(sample) {
    d3.json("samples.json").then((data) => {

    // Use sample_values as the values for the bar chart.    
        let samples = data.samples;
        let sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = sampleArray[0];
    // Use otu_ids as the labels for the bar chart.
        let otuIDs = result.otu_ids;
     // Use otu_labels as the hovertext for the chart.
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;

        // BAR PLOT

var yAxis = otuIDs.map(num => "OTU" + num + " ");
        
var bar_trace = {
     x: sampleValues.slice(0, 20),
     y: yAxis.slice(0, 10),
     type: "bar",
    orientation: "h",
    marker: {color: "#blue", opacity: 0.25},
    text: otuLabels.slice(0, 10)
    
};
        
let graphData = [bar_trace];
        
let layout = {
        title: "Top 10 OTU's", 
        yaxis: {autorange: "reversed"},
        xaxis: {autorange: ""},
        xaxis: {title: "Sample Values" },
        yaxis: {title: "OTU Identification" + "    "},
       

};
        
    Plotly.newPlot("bar", graphData, layout);
    console.log(bar_trace);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
// TASK 3 : Create a bubble chart that displays each sample.

        function buildBubble(sample) {
            d3.json("samples.json").then((data) => {
        
            // Use sample_values as the values for the bar chart.    
                let samples = data.samples;
                let sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
                let result = sampleArray[0];
            // Use otu_ids as the labels for the bar chart.
                let otuIDs = result.otu_ids;
             // Use otu_labels as the hovertext for the chart.
                let otuLabels = result.otu_labels;
                let sampleValues = result.sample_values;
        
                // BAR PLOT

        var bubble_trace = {
             x: otuIDs,
             y: sampleValues,
             type: "bubble",
             marker: {
                color: otuIDs,
                size: sampleValues},
                mode: 'markers',
            text: otuLabels.slice(0, 150)
             }; 
          
        var bubbleData = [bubble_trace];
        
        var layout = {
            title: "Each Patient's Sample",
            yAxis: "OTU Value",
            xaxis: { title: "OTU Identification" },
            yaxis: { title: "Sample Values" }

        };
        
                
            Plotly.newPlot("bubble", bubbleData, layout);
            console.log(bubble_trace)
            });
        };
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
// TASK 4 : Display the sample metadata, i.e., an individual's demographic information.


function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");
    
        PANEL.html("");
        PANEL.append("h6").text("ID: " + result.id);
        PANEL.append("h6").text("ETHNICITY: " + result.ethnicity);
        PANEL.append("h6").text("GENDER: " + result.gender);
        PANEL.append("h6").text("AGE: " + result.age);
        PANEL.append("h6").text("LOCATION: " + result.location);
        PANEL.append("h6").text("BBTYPE: " + result.bbtype);
        PANEL.append("h6").text("WFREQ: " + result.wfreq);
        });
    };
    
buildMetadata(940);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////