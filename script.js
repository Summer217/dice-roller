function getRandRollBySides (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
	//return Math.floor((Math.random() * (max)) + 1);
}

var numOfCont = 1;

function giveContUniqueId(input) {
		input.id = 'container-' + numOfCont;
		input.children[0].id = 'countField-' + numOfCont;
		input.children[1].id = 'dieType-' + numOfCont;
		console.log(input.children[1].id);
}

function roller(){
	populateBag();
	rollDice();
}

//console.log(numOfCont);
/*Used in addMenu function for counting*/
counter = 1;
/*Used in checking status of bag (wheter values have been input or not*/
fullBag = 0;

function clickedMore(clickCount) {
	clickCount++;
	return clickCount;
}

//numOfCont = clickedMore(numOfCont);

/*Called by HTML to populate with chosen values*/
var dicebag = [];
function populateBag() {
	dicebag = [];
	/*Checks if and makes sure dicebag is empty*/
	/*if(fullBag === 1) {
		dicebag = [];
		flipSwitch = 0;
	} */
	//var x = document.getElementsByClassName('countField');
	//var y = document.getElementsByClassName('chosenDieType');
	
	//var addons = document.getElementById('addons').childElementCount;
	//console.log(addons);
	
	//for (var i = 0; i < (numOfCont); i++) {
	for (var j = 1; j < (numOfCont+1); j++) {
			var z = document.getElementById("container-" + j).children;
			console.log(z);
			var xx = z[0];
			var yy = z[1];
			var die = yy.value;
			var number = Number(xx.value);
			/*var die = y[j].value;
			var number = Number(x[j].value);*/
			//console.log(die);
			//console.log(number);
			dicebag.push({die: die, num: number});
			//console.log(dicebag);
			//console.log(dicebag.push({die})+"rando");
			//console.log(dicebag.push({die})+"quirk");
		//}
	}
	/*Sets the bag as "full" (array has all values)*/
	fullBag = 1;
	//console.log(dicebag);
	//console.log(dicebag[0].die + ' key test');
}

/*Copies dice amount and dice type field when more is pressed*/
function addMenu() {
	counter++;
	numOfCont = clickedMore(numOfCont);
	//var newMenus = document.getElementById('fields').cloneNode(true);
	var newMenus = document.getElementById('container-1').cloneNode(true);
  newMenus.id = '';
	//target input set attribute value to empty
	newMenus.style.display = 'block';
	//console.log(newMenus.childNodes);
	var newMenu = newMenus.childNodes;
	//console.log(newMenu); 
	//var e = document.getElementsByClassName("chosenDieType")[0];
	//console.log(e);
  //var usrSelection = e.options[e.selectedIndex];
	//console.log(newMenus);
	var newCountField = newMenus.children[0];
	var newDieField = newMenus.children[1];

	giveContUniqueId(newMenus);
	
	//console.log(newMenus.children);
	
	var addons = document.getElementById('addons');
	addons.appendChild(newMenus);
	//console.log('Container '+ numOfCont);
 }

function rollDice() {
	/*bagD is bagDice*/
  dicebag.forEach(function(bagD) {
		//console.log(bagD.num);
		
		/*Input error check: make sure input number is positive and an integer*/
	if(bagD.num >= 0 && Number.isInteger(bagD.num) === true) { 
			var div = document.createElement('div');
			// append class bagD.die to above div
			div.classList.add(bagD.die)
			/*Tests input dice and numbers*/
      //console.log("Rolled " + bagD.num bagD.die);
			
			/*For loop for rolling dice, calls getRandRollBySides*/
			for(var i = 1; i <= bagD.num; i++) {
				
				/*Takes 'd??', removes d character, takes number of sides and converts from string to a number*/
				var dspanMatcher = Number(bagD.die.substring(1));
				
				/*Stores random dice roll within sides of die*/
				var result =  (getRandRollBySides(1, dspanMatcher));
				var diceSpan = document.createElement('span');
				diceSpan.innerHTML = result;
				div.appendChild(diceSpan);
				//console.log(div);
				/*Test of bagD to see if input is working*/
				//console.log(bagD.die);
				/*For Loop End*/
			}
			//console.log(div);
			document.getElementById('results').appendChild(div);
		}
		else console.log("ERROR for number input for " + bagD.die + ". Please input a non-negative integer.");
  });
	//console.log("END!!!!!!!!!!")
}; 