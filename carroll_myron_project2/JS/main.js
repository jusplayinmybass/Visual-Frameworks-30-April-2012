// Author: Myron Carroll
// Title: Assignment 2 JavaScript
// Class: Visual Frameworks

// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
var titleGroups = ["Choose One", "Ms", "Mrs", "Mr"];
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

	//Variable Defaults
	
	makeTitle();
	
	//Set Links and Submit Click Events
	var displayLink = $('display');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener('click', clearLocal);
	var save = $('submit');
	save.addEventListener('click', storeData);



});