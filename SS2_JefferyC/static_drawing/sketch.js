/*
  Name: Jeffery Chong
  Title: The Manhattan Grid: Organized Chaos
  Theme Concept: This concept explores the tension between rigid urban structures 
  and the fluid, unpredictable human movement within them. This first sketch establishes 
  the foundational geometric constraints of NYC—the iconic grid system—using contrasting 
  line weights and geometric layers to represent avenues, streets, and Central Park.
*/

function setup() 
{
  createCanvas(800, 600);
  
  noLoop(); 
}

function draw() 
{
  background(30, 35, 45); 

  let cols = 6;
  let rows = 6;
  let blockWidth = 70;
  let blockHeight = 50;
  let spacing = 90;

  let startX = 65;
  let startY = 65;

  fill(46, 139, 87);
  noStroke();
  rect(350, 100, 120, 400);

  fill(60, 65, 75);
  stroke(40);
  strokeWeight(1);
  
  for (let x = 50; x < width - 50; x += 60) 
  {
    for (let y = 50; y < height - 50; y += 40) 
    {
      if (!(x >= 350 & x < 470 & y >= 100 & y < 500)) 
      {
        rect(x, y, 45, 25);
      }
    }
  }

  stroke(245, 222, 179);
  strokeWeight(4);
  for (let x = 50; x < width; x += 60) 
  {
    line(x, 20, x, height - 20);
  }

  stroke(100, 105, 115);
  strokeWeight(1.5);
  for (let y = 50; y < height; y += 40) 
  {
    line(20, y, width - 20, y);
  }

  stroke(255, 99, 71);
  strokeWeight(5);
  line(100, 20, 700, height - 20);

  fill(255, 215, 0);
  stroke(255);
  strokeWeight(3);
  ellipse(350, 100, 22, 22);
  
  fill(0, 162, 232);
  noStroke();
  ellipse(220, 115, 12, 12);
  ellipse(460, 310, 12, 12);
  ellipse(580, 405, 12, 12);
}