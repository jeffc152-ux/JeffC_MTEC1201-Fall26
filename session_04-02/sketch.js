/*
	<><><><><><><><><><><><><><><><><><><>
	<>	FUN W/ CONDITIONALS & RANDOM	<>
	<>				by Ian Pokorny		<>
	<><><><><><><><><><><><><><><><><><><>
	* Click mouse to change	ellipse fill & movement
*/

//GLOBAL VARIABLE DECLARATION

//ellipse variables
let x = 0;
let y = 0;
let xMove = 0;
let yMove = 0;

//fill color variables
let r = 0;
let g = 255;
let b = 0;

function setup()
{
	createCanvas(700, 700);
	
	//start ellipse at center of canvas
	x = width / 2;
	y = height / 2;
}

function draw()
{
	background(75);
	fill(r, g, b);
	ellipse(x, y, 100, 100);
	
	//increment X & Y location based on Move amount
	x += xMove; //same as: x = x + xMove
	y += yMove;	//same as: y = y + yMove

    // has the X or Y position gone beyond the bounds
    // If so, reverse direction

    // OR: ||
    // AND = &&
    // EQUALITY: ==
    // GREATER THAN: >
    // GREATER THAN or equal to: >=
    // LESS THAN: <
    // LESS THAN or equal to: <=
    // NOT EQUAL: !=

    if (x >= width || x <= 0)
    {
        xMove = -xMove;
    }
    if (y >= height || y <= 0)
    {
        yMove = -yMove;
    }
}

function mousePressed()
{
    xMove = random(-10, 10);
    yMove = random (-10, 10);

    r = random(255);
    g = random(255);
    b = random(255);

    // print values to the console
    print ("x: " + x + " y: " + y + " xMove: " + xMove + " yMove: " + yMove);
}