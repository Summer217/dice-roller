/*Main function.
Called by submitButton (value = Roll!)*/
function roller(){
	populateBag();
	rollDice();
}

function getRandRollBySides (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
	//return Math.floor((Math.random() * (max)) + 1);
}

/*Keeps track of total number of containers to ensure all fields are captured*/
var numOfCont = 1;

/*Dynamically generates a unique id (starting at 1) for dice-container(container-#),
countField(countField-#),and chosenDieType(dieType-#)*/
function giveContUniqueId(input) {
	input.id = 'container-' + numOfCont;
	input.children[0].id = 'countField-' + numOfCont;
	input.children[1].id = 'dieType-' + numOfCont;
	/*Uncomment Below to enable remove button features
	input.children[2].id = '' + numOfCont;
	*/
}

/*counts how many times moreMenuButton has been clicked to maintain accurate # of total containers.
Needed to ensure all dice and counts chosen are populated in dicebag array. */
function clickedMore(clickCount) {
	clickCount++;
	return clickCount;
}

/*Uncomment below to enable remove button features
function removeCont(buttonId) {
	var thisCont = document.getElementById("container-" + buttonId);
	thisCont.remove();
}
*/

/*Stores dice types and counts so that rollDice can use them as parameters*/
var dicebag = [];
function populateBag() {
	dicebag = [];
	//var x = document.getElementsByClassName('countField');
	//var y = document.getElementsByClassName('chosenDieType');
	//var addons = document.getElementById('addons').childElementCount;
	for (var j = 1; j < (numOfCont+1); j++) {
		var z = document.getElementById("container-" + j).children;
		console.log(z);
		var xx = z[0];
		var yy = z[1];
		var die = yy.value;
		var number = Number(xx.value);
		/*var die = y[j].value;
		var number = Number(x[j].value);*/
		dicebag.push({die: die, num: number});
	}
	/*Sets the bag as "full" (array has all values)*/
	fullBag = 1;
	//console.log(dicebag[0].die + ' key test');
}

/*Copies dice amount and dice type field when more is pressed*/
function addMenu() {
	numOfCont = clickedMore(numOfCont);
	var newMenus = document.getElementById('container-1').cloneNode(true);
	newMenus.id = '';
	//target input set attribute value to empty
	newMenus.style.display = 'block';
	var newMenu = newMenus.childNodes;
	var newCountField = newMenus.children[0];
	/*Resets number field to 1 to provide visual cohesion and organization*/
	newCountField.value = 1;
	var newDieField = newMenus.children[1];
	/*Uncomment below to enable remove button features
	var removeBtn = document.createElement("input");
	removeBtn.type = 'button';
	removeBtn.value = "Remove";
	newMenus.appendChild(removeBtn);
	*/
	giveContUniqueId(newMenus);
	/*Uncomment below to enable remove button features
	var buttonId = removeBtn.id;
	removeBtn.onclick = function(){
		removeCont(buttonId);
	}
	*/
	var addons = document.getElementById('addons');
	addons.appendChild(newMenus);
 }

function rollDice() {
	/*bagD is bagDice*/
  dicebag.forEach(function(bagD) {
	/*Input error check: make sure input number is positive and an integer*/
	if(bagD.num >= 0 && Number.isInteger(bagD.num) === true) { 
			var div = document.createElement('div');
			// append class bagD.die to above div
			div.classList.add(bagD.die)
			
			/*Iterates thru dicebag to roll a specific die (num) times.
			Ensures that each die is rolled enough times.*/
			for(var i = 1; i <= bagD.num; i++) {
				/*Take 'd??', remove d char, take # of sides and convert from string to a num*/
				var dspanMatcher = Number(bagD.die.substring(1));
				/*Stores random dice roll within sides of die.
				Ensures that die rolls cannot be impossibly large*/
				var result =  (getRandRollBySides(1, dspanMatcher));
				var diceSpan = document.createElement('span');
				/*Places result value in diceSpan to display results in HTML*/
				diceSpan.innerHTML = result;
				div.appendChild(diceSpan);
				/*For Loop End*/
			}
			document.getElementById('results').appendChild(div);
		}
	else console.log("ERROR for number input for " + bagD.die + ". Please input a non-negative integer.");
  });
}; 
