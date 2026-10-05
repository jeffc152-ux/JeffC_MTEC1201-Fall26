/*
////////////////////////////////////////////////////
 Demo 1: working with image assets. 
 Demo 2: adds text animation.
 Demo 3: adds mouse response and second image asset. 
 Demo 4: more of working with image assets.
 Switches between 2 images while using a 3rd variable as placeholder.
 
 Press '1' and '2' key to switch between images.
 Press and hold mouse.
 ///////////////////////////////////////////////////
 
 Note the use of preload() in this sketch for loading assets before setup() is called. 
 */

//Create a p5.Image object to store image
let tuna; //Declares p5.Image object called tuna
let goldfish; //Creates a p5.Image object called goldfish
let shark; //Declares p5.Image object called shark

//Creates variables for text animation
let opacity = 0;
let fade = 1;

//Creates variable for fish animation
let fall = 0;

//setup() is called AFTER preload() is complete and runs only once
async function setup() 
{
	createCanvas(500, 500);
	background(200);
	imageMode(CENTER); //draws images from center point
	textAlign(CENTER); //draws text from centerpoint
	textSize(88); //sets size of text
  fish = tuna; //assign tuna image to fish

  tuna = await loadImage("assets/tuna.png");
	shark = await loadImage("assets/shark.png");
  goldfish = await loadImage("assets/goldfish.png");
}

//draw() runs continuously after preload() and setup() are complete
function draw() 
{
	background(200);

  let imageWidth = 400;
	let imageHeight = 400;
	
  //display image with image() method
	if (fish === goldfish)
	{
  	image (fish, width/2, height/2, imageWidth/4, imageHeight/4); //reduce size if goldfish
	}
	else
	{
		image (fish, width/2, height/2, imageWidth, imageHeight);
	}

	//text display and animation
	fill(opacity);
	text("FISH!", width / 2, height / 2 - 50); //displays text
	opacity = opacity + fade;
	
	if (opacity > 255 || opacity < 0) 
	{
		fade = -fade;
	}

	if (mouseIsPressed) 
	{
		background(255);
		text("YUM!", width / 2, height / 2 - 70); //displays text
		image(shark, width / 2, height / 2, shark.width/2, shark.height/2);
		image(tuna, width / 2, fall, tuna.width/2, tuna.height/2);
		
		if (fall < height / 2) 
		{
			fall++;
		}
	} 
	else 
	{
		fall = 0;
	}

	print("opacity: " + opacity);
	print("fade: " + fade);
	print("fall: " + fall);
}