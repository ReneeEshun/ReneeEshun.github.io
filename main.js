// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $pagination=document.querySelector(".pagination");
var $maxresults=50;

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredAddresses to addressData initially
var filterdata = dataSet;

// renderTable renders the filter data to the tbody
function renderTable(page=0) {
  $tbody.innerHTML = "";
  var start =page * $maxresults;
  var end=start + $maxresults;
  for (var i = 0; i < $maxresults; i++) {
    // Get get the current address object and its fields
    console.log(start, i);
    var alien = filterdata[start + i];
    console.log(alien);
    var fields = Object.keys(alien);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = alien[field];
    }
  }
  // show pagination
var Numberofpages=filterdata.length/$maxresults;
$pagination.innerHTML="";
for(let i=0; i < Numberofpages; i++){
  var li=document.createElement("Li");
  var a=document.createElement("a");
  li.classList.add("page-item");
  a.classList.add("page-Link");
  a.text=i+1;
  a.addEventListener("click",function(){
    renderTable(i);
  });
  li.appendChild(a);
  $pagination.appendChild(li);
}







}

function handleSearchButtonClick() {
    // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filterdata = dataSet.filter(function(alien) {
    return ($datetimeInput.value.trim()===alien.datetime || $datetimeInput.value.trim()==='') &&
    ($cityInput.value.trim()===alien.city|| $cityInput.value.trim()==='') &&
    ($stateInput.value.trim()===alien.state || $stateInput.value.trim()==='') &&
    ($countryInput.value.trim()===alien.country || $countryInput.value.trim()==='') &&
    ($shapeInput.value.trim()===alien.shape|| $shapeInput.value.trim()==='');

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return datetime=== filter;
  });
  // console.log(filteredAddresses)
  renderTable();
}

function loadShapeOptions() {
  var shaperesults=dataSet.map(function(alien){
   return alien.shape;

  });
  shaperesults=new Set(shaperesults);
  shaperesults.forEach(function (shape){
    var option=document.createElement("option");
    option.text=shape;
    $shapeInput.add(option);
  
    
  });
}
// Render the table for the first time on page load
renderTable();
loadShapeOptions();