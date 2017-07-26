
/*Keeps track of total number of containers to ensure all fields are captured*/
var numOfCont = 1;

/*Stores dice types and counts so that rollDice can use them as parameters*/
var dicebag = [];

var minimum = 0;
var maximum = 0;
var tableRow = "placeholder";

/*Main function.
Called by submitButton (value = Roll!)*/
function roller(){
	tableMaker();
	populateBag();
	rollDice();
}

function toggleInput() {
	var inputState = document.getElementById('inputDiv');
	var btn = document.getElementById('toggleInput');
	if (inputState.className == 'show') {
		//console.log('Mayonaise');
    		inputState.className = 'hide';
    		btn.value = 'Show';
	} else (inputState.className == 'hide') {
		inputState.className = 'show';
		btn.value = 'Hide';
	}
    
  }

function toggleResults() {
	var resultState = document.getElementById('results');
	var btn = document.getElementById('toggleResult');
	if (resultState.className == 'show') {
		resultState.className = 'hide';
		btn.value = 'Show';
	} else {
		resultState.className = 'hide';
		btn.value = 'Hide';
	}
}

/*Populates each row item with */
function rowFiller(die, cellResult, total, average) {
	tableRow =        document.createElement('tr');
	var cellDie =     document.createElement('td');
	var cellAverage = document.createElement('td');
  	var cellMin =     document.createElement('td');
  	var cellMax =     document.createElement('td');
	var cellTotal =   document.createElement('td');
	cellDie.innerHTML =                     die;
	cellTotal.innerHTML =                 total;
  	cellAverage.innerHTML = Math.round(average);
  	cellMin.innerHTML =                 minimum;
  	cellMax.innerHTML =                 maximum;
	tableRow.appendChild(cellDie);
	tableRow.appendChild(cellResult);
	tableRow.appendChild(cellTotal);
  	tableRow.appendChild(cellAverage);
  	tableRow.appendChild(cellMin);
  	tableRow.appendChild(cellMax);
}

/*Adds headers to table*/
function tableMaker() {
	var table =   document.getElementById('table');
	var headRow =     document.createElement('tr');
	var headDie =     document.createElement('th');
	var headResult =  document.createElement('th');
	var headTotal =   document.createElement('th');
	var headAverage = document.createElement('th');
	var headMin =     document.createElement('th');
	var headMax =     document.createElement('th');
	headDie.innerHTML = 'Die';
	headResult.innerHTML = 'Result';
	headTotal.innerHTML = 'Total';
	headAverage.innerHTML = 'Average';
	headMin.innerHTML = 'Min';
	headMax.innerHTML = 'Max';
	headRow.appendChild(headDie);
	headRow.appendChild(headResult);
	headRow.appendChild(headTotal);
	headRow.appendChild(headAverage);
	headRow.appendChild(headMin);
	headRow.appendChild(headMax);
	table.appendChild(headRow);
}

/**/
function minMax(result, prev) {
  if(result > maximum) {
    	maximum = result;
  } else {}
  if(result < minimum) {
    	minimum = result;
  } else {}
 }


/*Generates a semi-random number roll on the dice within a 
*realistic lower bound (as of now always 1) and an 
*upper bound (sides of the dice) which is provided by dice roller*/

function getRandRollBySides (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
	//return Math.floor((Math.random() * (max)) + 1);
}



/*Dynamically generates a unique id (starting at 1) for dice-container(container-#),
countField(countField-#),and chosenDieType(dieType-#)*/
function giveContUniqueId(input) {
	input.id = 'container-' + numOfCont;
	input.children[0].id = 'countField-' + numOfCont;
	input.children[1].id = 'dieType-' + numOfCont;
	//Uncomment Below to enable remove button features
	input.children[2].id = '' + numOfCont;
	
}

/*Resets form to default values and clears webpage of generated elements*/
function resetter() {
	var x = document.getElementById('countField-1');
	var y = document.getElementById('dieType-1').options;
	x.value = 1;
	y.selectedIndex = 0;
	var destroyDiv = document.getElementById('addons');
	var destroyTable = document.getElementById('table');
	while(destroyDiv.firstChild) {
		destroyDiv.removeChild(destroyDiv.firstChild);
	}
	while(destroyTable.firstChild) {
		destroyTable.removeChild(destroyTable.firstChild);
	}
	/*Resets number of containers to one after reset*/
	numOfCont = 1;
}

/*counts how many times moreMenuButton has been clicked to maintain accurate # of total containers.
Needed to ensure all dice and counts chosen are populated in dicebag array. */
function clickedMore(clickCount) {
	clickCount++;
	return clickCount;
}

function badChoice() {
	var report = false;
	for (var k = 1; k < (numOfCont + 1); k++) {
	   if (document.getElementById('container-' + k) == null) {
	   	   //console.log("Do nothing");
	   } else {
	     var qadrizzle = document.getElementById('dieType-' + k);
	     var qarain = qadrizzle.options[qadrizzle.selectedIndex].value;
	     if (qarain == 'select') {
		report = true;
	     } else {
	        report = false;
	     }
        }
   }
   return report;
}
	


/*Removes container when remove button is pressed*/
function removeCont(buttonId) {
	var thisCont = document.getElementById("container-" + buttonId);
	thisCont.remove();
}

function populateBag() {
	dicebag = [];
	var hook = 0;
	
	for (var j = 1; j < (numOfCont+1); j++) {
		var qasmoke = document.getElementById('dieType-' + j);
		if (document.getElementById('container-' + j) != null) {
			if (qasmoke.options[qasmoke.selectedIndex].value == 'select') {
			   hook++;
			   //console.log('Error: You cannot choose select as a die value!');
			   alert('Error: All dice must be selected before rolling!');
		        } else {
			   var z =      document.getElementById('container-' + j).children;
			   var xx =     z[0];
			   var yy =     z[1];
			   var die =    yy.value;
			   var number = Number(xx.value);
			   dicebag.push({die: die, num: number});
	}
	/*Sets the bag as "full" (array has all values)*/
	fullBag = 1;
	if (hook > 0) {
		dicebag= [];
		var destroyTable = document.getElementById('table');
		while(destroyTable.firstChild) {
			destroyTable.removeChild(destroyTable.firstChild);
		}
	}
	hook = 0;
	}
   }
}

/*Copies dice amount and dice type field when more is pressed*/
function addMenu() {
	
	var invalid = badChoice();
	
	if (invalid == true) {
		alert('Please choose a die type before adding more!');
		//console.log("Dragon noises");
	} else {
	
	
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
	
	//Uncomment below to enable remove button features
	var removeBtn = document.createElement("input");
	removeBtn.type = 'button';
	removeBtn.value = "Remove";
	newMenus.appendChild(removeBtn);

	giveContUniqueId(newMenus);
	//Uncomment below to enable remove button features
	var buttonId = removeBtn.id;
	removeBtn.onclick = function(){
		removeCont(buttonId);
	}

	var addons = document.getElementById('addons');
	addons.appendChild(newMenus);
 }
}

function rollDice() {
	/*bagD is bagDice*/
  dicebag.forEach(function(bagD) {
	/*Input error check: make sure input number is positive and an integer*/
	if(bagD.num >= 0 && Number.isInteger(bagD.num) === true) { 
			var div = document.createElement('div');
			// append class bagD.die to above div
			div.classList.add(bagD.die)
			var exclusiveMin = Number(bagD.die.substring(1));
			var cellResult = document.createElement('td');
			var total = 0;
      			var average = 0;
			/*Sets min to highest possible die value to ensure 
			*that minMax can reduce that value if lower.*/
			minimum = exclusiveMin;
     			maximum = 0;
			/*Iterates thru dicebag to roll a specific die (num) times.
			Ensures that each die is rolled enough times.*/
			for(var i = 1; i <= bagD.num; i++) {
				/*Take 'd??', remove d char, take # of sides and convert from string to a num*/
				var dspanMatcher = Number(bagD.die.substring(1));
				/*Stores random dice roll within sides of die.
				Ensures that die rolls cannot be impossibly large*/
				var result =  (getRandRollBySides(1, dspanMatcher));
				minMax(result);
				/*Increments total by the number(s) rolled to keep track of the sum of the dice*/
        			total += result;
        			average = total/bagD.num;
				cellResult.innerHTML = cellResult.innerHTML + result;
				
				/*Add commas if result number is not first or last in series*/
				if(bagD.num > 1 && i != bagD.num) {
					cellResult.innerHTML = cellResult.innerHTML + ", ";	
				}
				rowFiller(bagD.die, cellResult, total, average);

				/*For Loop End*/
			}
		
			document.getElementById('table').appendChild(tableRow);
		}
	else console.log("ERROR for number input for " + bagD.die + ". Please input a non-negative integer.");
  });
}; 
