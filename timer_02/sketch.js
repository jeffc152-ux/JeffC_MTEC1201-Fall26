/*
<><><><><><><><><><><><><><><><>
<>	Demo for repeating timer	<>
<><><><><><><><><><><><><><><><>
*/

let timer = 1000; //setting up timer variable for 1000 millisecond trigger
let currentTime = 0; //tracking millis() clock
let savedTime = 0; // temp saved times, needed for comparison

let ellipseX = 0; //variable for x value of ellipse
let increment = 20;	//variable for increment of x movement
let ellipseSize = 150; //variable for circle diameter

function setup() 
{
	createCanvas(800, 400);
	textAlign(CENTER); //draw text from centerpoint
	textSize(48); //sets size of text
	stroke(0); //set stroke color to black
	strokeWeight(3); //set stroke weight to 2
}

function draw() 
{
	currentTime = millis(); //update currentTime in draw so that it is continuously updating
	
	background(200); //clear frame with light grey
	
	//display current and saved time on canvas:
	text("currentTime: " + int(currentTime), width/2, height/4);
	text("savedTime: " + int(savedTime), width/2, height/8);
	
	ellipse(ellipseX, height / 2, ellipseSize, ellipseSize); //draw ellipse at current x position

	
	if (currentTime - savedTime > timer) //if 1 second has passed since last timer trigger...
	{
		if (ellipseX > width) //reset ellipseX to 0 if it goes off the canvas
		{
			ellipseX = 0;
		} 
		else 
		{
			ellipseX += increment; //increment ellipseX value so it moves to the right
		}
		
		fill(random(255), random(255), random(255)); //change fill to random color
		
		/*	
			It's very important to update savedTime after the timer triggers.
			We need to keep track of when the last timer event occurred, 
			so we can determine when the next one should trigger.
		*/
		savedTime = currentTime; //assign value of currentTime to savedTime
	}
}