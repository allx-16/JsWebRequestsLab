
var data ={}
var xhr = new XMLHttpRequest();
var requestUrl = "https://fakestoreapi.com/products";
tbody= document.getElementById("tableBodyData");
btnRemove=document.getElementById("btnRemove");
btnRemove.addEventListener("click",function(e){
    tbody.innerHTML = "";
});

// Genera una fila <tr> con los datos de un producto
function genTr(json) {
    tr = document.createElement("tr");
    td1 = document.createElement("td");
    td2 = document.createElement("td");
    td3 = document.createElement("td");
    td4 = document.createElement("td");
    td5 = document.createElement("td");

    td1.innerText = json.id;
    td2.innerText = json.title;
    td3.innerText = json.price;
    td4.innerText = json.description;
    td5.innerText = json.category;
    tr.append(td1, td2, td3, td4, td5);
    return tr;
}

// Vacía la tabla y la llena con los productos del arreglo
function fillTable(array) {
    tbody.innerHTML = "";
    array.forEach(element => {
        console.log(element);
        tbody.append(genTr(element));
    });
}

//consumir api
function getData(url){
    xhr.open("GET", requestUrl, true); 
    xhr.onload = function(url){
        console.log(xhr.responseText);
        // Handle data
        array = JSON.parse(xhr.responseText);
        data.json=array;
        fillTable(array);
    };
    xhr.send();
}
getData();

// Botón Load Data: se asocia desde JS, sin modificar el HTML
btnLoad = document.getElementById("btnLoad");
btnLoad.addEventListener("click", function (e) {
    getData();
});

// Botón de búsqueda: filtra por título y muestra solo las coincidencias
input = document.getElementById("inputSearch");
btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", function (e) {
    if (!data.json) {
        return; // todavía no se han cargado los datos
    }
    filtered = data.json.filter(function(e) {
        // Se compara en minúsculas para que "shirt" encuentre "Shirt"
        return e.title.toLowerCase().includes(input.value.toLowerCase());
    });
    console.log(filtered);
    fillTable(filtered);
});
