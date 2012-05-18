// Author: Myron Carroll
// Title: Assignment 2 JavaScript
// Class: Visual Frameworks

// Wait until the DOM is ready.

window.addEventListener("DOMContentLoaded", function(){
var titleGroups = ["Choose One", "Ms", "Mrs", "Mr"],
    groupValue;
    //GetElementByID Function
    function $(x){
        var theElement = document.getElementById(x);
        return theElement;
    }
    //Create select field element and populate with options.
    function makeTitle(){
        var formTag = document.getElementsByTagName("form"),
            selectLi=$('select'),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "title");
        for(var i=0, j=titleGroups.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = titleGroups[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    //Find value of selected radio button
    function getSelectedRadio(){
        var radios = document.forms[0].group;
        for(var i=0; i < radios.length; i++){
        if(radios[i].checked){
                var groupValue = radios[i].value;
            }
        }
    }
    
    function toggleControls(n){
    switch(n) {
        case "on":
            $("minForm").style.display = "none";
            $("clear").style.display = "inline";
            $("display").style.display = "none";
            $("addNew").style.display = "inline";
            break;
        case "off":
            $("minForm").style.display = "block";
            $("clear").style.display = "inline";
            $("display").style.display = "inline";
            $("addNew").style.display = "none";
            $("items").style.display = "none";
            break;
        default:
            return false;
    }
}

    //Store the data to local storage
    function storeData(){
        var id = Math.floor(Math.random()*10000000001);
        //Gather up all form field values in an object
        //Object properties contain an array that contains the form label and input value.
        getSelectedRadio();
        var item          ={};
            item.title    =["Title", $('title').value];
            item.fname    =["First Name", $('fname').value];
            item.lname    =["Last Name", $('lname').value];
            item.email    =["Email", $('email').value];
            item.birth    =["Birthday", $('birth').value];
            item.group    =["Group", groupValue ];
            item.prayer    =["Prayer Request", $('prayer').value];
            item.needs    =["Needs", $('needs').value];
            //Save the data in local storage: use stringify to convert to a string
            localStorage.setItem(id, JSON.stringify(item));
            alert("Contact Saved");
    }
    function getData(){
    toggleControls("on");
	if (localStorage.length === 0){
		alert("There is no data in Local Storage");
	}
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
    document.body.appendChild(makeDiv);
    $("items").style.display = "block";
        for(var i=0, len=localStorage.length; i<len; i++){
            var makeLi = document.createElement('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
        var makeSublist = document.createElement("ul");
        makeLi.appendChild(makeSublist);
        for (var n in obj) {
            var makeSubli = document.createElement("li");
            makeSublist.appendChild(makeSubli);
            var optSubText = obj[n][0] + " " + obj[n][1];
            makeSubli.innerHTML = optSubText;
            
        }
    
    }
}
    
   
function clearLocal(){
    if(localStorage.length === 0) {
        alert("There is no data to clear.");
    }else{
        localStorage.clear();
        alert("All contacts are deleted.");
        window.location.reload();
        return false;    
	}
}
 
    makeTitle();
    
    //Set Links and Submit Click Events
    var displayLink = $('display');
    displayLink.addEventListener("click", getData);
    var clearLink = $('clear');
    clearLink.addEventListener('click', clearLocal);
    var save = $("submit");
    clearLink.addEventListener('click', storeData);



});