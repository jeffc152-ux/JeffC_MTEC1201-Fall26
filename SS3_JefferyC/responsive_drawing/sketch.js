/*
  Name: Jeffery Chong
  Title: Cybernetic Biosphere: Control Room Alpha
  
  Concept/Theme: 
  This concept/theme shows the intersection of organic growth patterns and rigid, technological 
  monitoring interfaces. This sketch ties into the theme by generating self-expanding "data 
  organisms" framed by a responsive, grid-based diagnostic overlay.
  
  Instructions:
  1. Move your mouse around to steer the tracking crosshairs and shift the network grid.
  2. Click the MOUSE to manually trigger a data pulse at the current cursor location.
  3. Press ANY KEY on your keyboard to instantly wipe the system cache and clear the screen.
*/

let corePulseSize = 10;
let signalVelocity = 1.5;

function setup() 
{
  createCanvas(800, 600);
  background(10, 15, 25); 
}

function draw() 
{
  background(10, 15, 25, 30);
  
  stroke(0, 150, 255, 40);
  strokeWeight(1);
  
  for (let i = 0; i < width; i += width / 12) 
  {
    line(i, 0, i, height);
  }
  for (let j = 0; j < height; j += height / 8) 
  {
    line(0, j, width, j);
  }
  
  corePulseSize += signalVelocity;
  
  if (corePulseSize > width / 3) 
  {
    corePulseSize = 10;
  }
  
  noFill();
  stroke(0, 255, 180, 80);
  strokeWeight(2);
  ellipse(width / 2, height / 2, corePulseSize, corePulseSize);
  ellipse(width / 2, height / 2, corePulseSize * 0.5, corePulseSize * 0.5);

  stroke(255, 0, 128, 150);
  strokeWeight(1.5);
  line(mouseX, mouseY, pmouseX, pmouseY); 
  
  stroke(0, 150, 255, 200);
  line(mouseX - 20, mouseY, mouseX + 20, mouseY);
  line(mouseX, mouseY - 20, mouseX, mouseY + 20);
  
  noStroke();
  fill(0, 150, 255);
  textSize(12);
  textFont('Courier New');
  text("SYSTEM: ACTIVE", 20, 30);
  text("CORE_SIZE: " + nfc(corePulseSize, 1), 20, 50);
  text("CURSOR_X: " + mouseX, 20, 70);
}

function mousePressed() 
{
  fill(255, 255, 255, 200);
  noStroke();
  ellipse(mouseX, mouseY, 80, 80);
  
  signalVelocity += 0.5; 
}

function keyPressed() 
{
  background(255, 0, 50); 
  corePulseSize = 10;   
  signalVelocity = 1.5; 
}

function windowResized() 
{
  resizeCanvas(800, 600);
  background(10, 15, 25);
}