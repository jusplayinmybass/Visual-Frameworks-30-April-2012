// Author: Myron Carroll
// Title: Assignment 2 JavaScript
// Class: Visual Frameworks

alert("Works");
// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
var titleGroups = ["Choose One", "Ms", "Mrs", "Mr"],
	groupvalue;
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
        var radio = document.forms[0].group;
        for(var i=0; i < radio.length; i++){
        if(radio[i].checked){
                var groupValue = radio[i].value;
            }
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
	//Variable Defaults
	
	makeTitle();
	
	//Set Links and Submit Click Events
/*	var displayLink = $('display');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener('click', clearLocal);
*/	var save = $('submit');
	save.addEventListener('click', storeData);



});