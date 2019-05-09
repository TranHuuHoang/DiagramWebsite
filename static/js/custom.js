colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'silvery', 'brown', 'white', 'pink', 'violet', 'black'];

data_pie = data[0];
data_graph = data[1];
console.log(data_pie)


function createCanvas(divName) {

    var div = document.getElementById(divName);
    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    var ctx = canvas.getContext("2d");
    return ctx;
}

function load_graph() {
    var ctx = createCanvas("graphDiv1");

    var graph = new BarGraph(ctx);
    graph.margin = 2;
    graph.width = 450;
    graph.height = 270;
    graph.colors = colors;
    graph.xAxisLabelArr = data_graph[0];

    graph.update(data_graph[1]);
}


//pie
function config_pie(data_pie) {
    return {
        type: 'pie',
        data: {
            datasets: [{
                data: data_pie[1],
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: data_pie[0]
        },
        options: {
            responsive: true
        }
    }
}

function load_pie() {
    var config = config_pie(data_pie);
    var ctx = document.getElementById('chart-area').getContext('2d');
    window.myPie = new Chart(ctx, config);
}



//load table pie
function load_chart_pie() {
    var table = document.getElementById("chart-pie").getElementsByTagName('tbody')[0];
    for (var i = 0; i < data_pie[0].length; i++) {
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = i + 1;
        cell2.innerHTML = data_pie[0][i];
        cell3.innerHTML = data_pie[1][i];
        row.onclick = function () {
            swal("what do you want to do?", {
                    buttons: {
                        Edit: "Edit",
                        Delete: "Detele",
                        Cancel: "Cancel",
                    },
                })
                .then((value) => {
                    switch (value) {

                        case "Cancel":
                            break;

                        case "Delete":
                            var cell = this.getElementsByTagName("td")[0];
                            var id = cell.innerHTML;
                            data_pie[0].splice(id - 1, 1);
                            data_pie[1].splice(id - 1, 1);
                            $('#chart-pie tbody tr').remove();
                            load_chart_pie();
                            load_pie();
                            swal("Done!", "Row is deleted!", "success");
                            break;

                        case "Edit":
                            var id = this.getElementsByTagName("td")[0].innerHTML;
                            var field = this.getElementsByTagName("td")[1].innerHTML;
                            var value = this.getElementsByTagName("td")[2].innerHTML;
                            var new_value = prompt("New value of " + field, value);
                            console.log(new_value);
                            data_pie[1][id - 1] = new_value;
                            $('#chart-pie tbody tr').remove();
                            load_chart_pie();
                            load_pie();
                            swal("Done!", "Row is edited!", "success");
                            break;
                        default:
                            break;
                    }
                });
        };
    }
}


//load table graph
function load_chart_graph() {
    var table = document.getElementById("chart-graph").getElementsByTagName('tbody')[0];;
    for (var i = 0; i < data_graph[0].length; i++) {
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = i + 1;
        cell2.innerHTML = data_graph[0][i];
        cell3.innerHTML = data_graph[1][i];
        row.onclick = function () {
            swal("what do you want to do ?", {
                    buttons: {
                        Edit: "Edit",
                        Delete: "Detele",
                        Cancel: "Cancel",
                    },
                })
                .then((value) => {
                    switch (value) {

                        case "Cancel":
                            break;

                        case "Delete":
                            var cell = this.getElementsByTagName("td")[0];
                            var id = cell.innerHTML;
                            data_graph[0].splice(id - 1, 1);
                            data_graph[1].splice(id - 1, 1);
                            $('#chart-graph tbody tr').remove();
                            load_chart_graph();
                            var list = document.getElementById("graphDiv1");
                            list.removeChild(list.childNodes[0]);
                            load_graph();
                            swal("Done!", "Row is deleted!", "success");
                            break;
                        case "Edit":
                            var id = this.getElementsByTagName("td")[0].innerHTML;
                            var field = this.getElementsByTagName("td")[1].innerHTML;
                            var value = this.getElementsByTagName("td")[2].innerHTML;
                            var new_value = prompt("New value of " + field, value);
                            console.log(new_value);
                            data_graph[1][id - 1] = new_value;
                            $('#chart-graph tbody tr').remove();
                            load_chart_graph();
                            var list = document.getElementById("graphDiv1");
                            list.removeChild(list.childNodes[0]);
                            load_graph();
                            swal("Done!", "Row is edited!", "success");
                            break;
                        default:
                            break;
                    }
                });
        };
    }
}

load_pie();
load_chart_pie();
load_graph();
load_chart_graph();


function addPie() {
    var field = document.getElementById("field-pie");
    var value_field = document.getElementById("value-pie");
    data_pie[0].push(field.value);
    data_pie[1].push(value_field.value)

    var table = document.getElementById("chart-pie");
    var i = data_pie[0].length - 1;

    var row = table.insertRow(i + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = i + 1;
    cell2.innerHTML = data_pie[0][i];
    cell3.innerHTML = data_pie[1][i];

    var config = config_pie(data_pie);
    var ctx = document.getElementById('chart-area').getContext('2d');
    window.myPie = new Chart(ctx, config);
}

function addGraph() {
    var field = document.getElementById("field-graph");
    var value_field = document.getElementById("value-graph");
    data_graph[0].push(field.value);
    data_graph[1].push(value_field.value)

    var table = document.getElementById("chart-graph");
    var i = data_graph[0].length - 1;

    var row = table.insertRow(i + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = i + 1;
    cell2.innerHTML = data_graph[0][i];
    cell3.innerHTML = data_graph[1][i];

    var list = document.getElementById("graphDiv1");
    list.removeChild(list.childNodes[0]);

    var ctx = createCanvas("graphDiv1");

    var graph = new BarGraph(ctx);
    graph.margin = 2;
    graph.height = 270;
    graph.colors = colors;
    graph.xAxisLabelArr = data_graph[0];

    graph.update(data_graph[1]);
}
