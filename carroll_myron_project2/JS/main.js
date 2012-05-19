// Author: Myron Carroll
// Title: Assignment 2 JavaScript
// Class: Visual Frameworks

// Wait until the DOM is ready.

window.addEventListener("DOMContentLoaded", function(){
var titleGroups = ["--Choose One--", "Ms", "Mrs", "Mr"],
    groupValue,
    errMsg = $("errors");
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
    function storeData(key){
	//If there is no key, this is a new item and generates a new key
	if(!key){
        var id = Math.floor(Math.random()*10000000001);
	}else{
		//Set id to the existing key so it will save over data
		id = key
	}
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
	    var linksLi = document.createElement('li'); 
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
	    makeSublist.appendChild(linksLi);
            
        }
	makeItemLinks(localStorage.key(i), linksLi); // Create edit and delete links for each item in local storage
    }
}

//Make Items Links

function makeItemsLinks(key, linksLi){
//add edit single item link
	var editLink = document.createElement('a');
	editLink.href = "#";
	editLink.key = key;
	var editText = "Edit Info";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);
	
	//Add break line
	var breakTag = document.createElement('br');
	linksLi.appendChild(breakTag);
	
	//Add delete single item link
	var deleteLink = document.createElement('a');
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Info"
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
}

function editItem(){
	//Grab data from Local Storage
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
	//Show Form
	toggleControls("off");
	
	//Populate form fields with current local storage values
	$('title').value = item.title[1];
	$('fname').value = item.fname[1];
	$('lname').value = item.lname[1];
	$('email').value = item.email[1];
	$('birth').value = item.birth[1];
	var radios = document.forms[0].group;
	for(var i=0; i<radios.length; i++){
		if(radios[i].value == "member"){
			radios[i].setAttribute("checked", "checked");
		} else if(radios[i].value == "not" && obj.group[1] == "not"){
			radios[i].setAttribute("checked", "checked");
		}else if (radios[i].value == "donot" && obj.group[2] == "donot"){
			radios[i].setAttribute("checked", "checked");
		}
		
	}
	$('prayer').value = item.prayer[1];
	$('needs').value = item.needs[1];
	//Remove initial listener from input 'save info' button
	save.removeEventLictener("click", storeData);
	//Change Submit to Edit Button
	$("submit").value = "Edit Contact";
	var editSubmit = $('submit');
	//save the key value established in this function as a property of the editSubmit event
	editSubmit.addEventListener("click", validate);
	editSubmit.ket = this.key;
	
}

function deleteItem(){
	var ask = confirm("Are You Sure you want to delete this contact?");
	if(ask){
		localStorage.removeItem(this.key);
		alert("Contact was deleted");
		window.location.reload();
	}else{
		alert('Contact was not deleted.');
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
 
 function validate(e){
	//Define elements to check
	var getTitle = $("title");
	var getFname = $('fName');
	var getLname = $('lName');
	var getEmail = $('email');
	
	//Reset Error Messages
	errMsg.innerHTML = "";
		getTitle.style.border = "1px solid black"
		getTitle.style.border = "1px solid black"
		getLname.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
	
	//Get Error messages
	var messageAry = [];
	//Title Validation
	if(getTitle.value=="--Choose One--"){
		var titleError = "Please Choose a Title";
		getTitle.style.border = "1px solid red"
		messageAry.push(titleError);
	}
	//First Name Validation
	if(getFname.value === ""){
		var fNameError = "Please Enter a First Name";
		getFname.style.border = "1px solid red";
		messageAry.push(fNameError);
	}
	//Last Name Validation
	if(getLname.value === ""){
		var lNameError = "Please Enter a First Name";
		getLname.style.border = "1px solid red";
		messageAry.push(lNameError);
	}
	//Email Validation
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(!(re.exec(getEmail.value))){
		var emailError = "Please Enter A Valid Email Address";
		getEmail.style.border = "1px solid red";
		messageAry.push(emailError);
	}
	
	//Iff there are errors display them on screen
	if(messageAry.length >= 1){
		for(var i=0, j=messageAry.length; i<j; i++){
			var txt = document.createElement('li');
			txt.innerHTML = messageAry[i];
			errMsg.appendChild(txt);
		}
		e.preventDefault();
		return false;
		
	}else{
		//If all is well, Store the data
		storeData(this.key);
	}
	
 }
    makeTitle();
    
    //Set Links and Submit Click Events
    var displayLink = $('display');
    displayLink.addEventListener("click", getData);
    var clearLink = $('clear');
    clearLink.addEventListener('click', clearLocal);
    var save = $("submit");
    clearLink.addEventListener('click', validate);



});