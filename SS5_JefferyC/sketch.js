/*
  Name: Jeffery Chong
  Title: Short Study #5: Responsive Patterns
  Instructions:
  - Move the mouse around the canvas to alter the size, density, and color palette of the pattern.
  - Click and drag anywhere to dynamically alter the rotation speed and visual chaos/unpredictability.
  - Press 'SPACEBAR' to generate a brand new randomized color palette and shape configuration.
  - Press 'S' to save a high-resolution frame of your canvas.
*/

let currentAngle = 0;
let palette = [];
let baseSpeed = 0.005;
let numSectors = 12;

function setup() 
{
  createCanvas(800, 600);
  angleMode(RADIANS);
  colorMode(HSB, 360, 100, 100, 100);
  generatePalette();
}

function draw() 
{
  // Translucent background creates a subtle trail / motion blur effect
  background(10, 15, 10, 20);

  // User input driving interactivity:
  // Mouse movement controls sector density and scale
  numSectors = floor(map(mouseX, 0, width, 6, 24, true));
  let globalScale = map(mouseY, 0, height, 0.5, 1.8, true);

  // Mouse press increases rotational speed and unpredictability
  let speedMultiplier = mouseIsPressed ? 4 : 1;
  currentAngle += baseSpeed * speedMultiplier;

  // Center the coordinate system for radial symmetry
  translate(width / 2, height / 2);

  // Outer radial Loop 1: Iterates through angular symmetry sectors
  for (let s = 0; s < numSectors; s++) 
  {
    push();
    let sectorAngle = (TWO_PI / numSectors) * s;
    rotate(sectorAngle + currentAngle);

    // Dynamic scale modification based on global user input
    scale(globalScale);

    // Inner nested Loop 2: Iterates radially outward to construct the pattern along each sector arm
    let stepCount = 10;
    for (let r = 1; r <= stepCount; r++) 
    {
      let distance = r * 35;

      // Unpredictability: Perlin noise offset applied to shape position and angle
      let noiseVal = noise(r * 0.1, s * 0.2, frameCount * 0.02);
      let jitterX = map(noiseVal, 0, 1, -15, 15);
      let jitterY = map(noiseVal, 0, 1, -10, 10);

      // Color selection driven by loop index and palette array
      let col = palette[r % palette.length];
      fill(col[0], col[1], col[2], 70);
      stroke(col[0], col[1] * 0.8, 100, 90);
      strokeWeight(map(r, 1, stepCount, 2, 0.5));

      push();
      translate(distance + jitterX, jitterY);
      rotate(noiseVal * TWO_PI + currentAngle * r * 0.1);

      // Conditional Statement: Evaluates radial depth to alter geometric morphology
      if (r % 3 === 0) 
      {
        // Draw expanding layered star / diamond
        beginShape();
        for (let i = 0; i < 4; i++) 
        {
          let a = (TWO_PI / 4) * i;
          let rx = cos(a) * (15 + noiseVal * 10);
          let ry = sin(a) * (15 + noiseVal * 10);
          vertex(rx, ry);
        }
        endShape(CLOSE);
      } 
      else if (r % 2 === 0) 
      {
        // Draw oscillating rings
        let d = 12 + sin(frameCount * 0.05 + r) * 8;
        ellipse(0, 0, d, d);
      } 
      else 
      {
        // Draw delicate floating satellite dots
        let dotSize = 6 + noiseVal * 8;
        rectMode(CENTER);
        rect(0, 0, dotSize, dotSize, 2);
      }

      pop();
    }

    pop();
  }
}

// Generates a cohesive color palette with subtle procedural noise variance
function generatePalette() 
{
  palette = [];
  let baseHue = random(360);
  for (let i = 0; i < 6; i++) 
  {
    let h = (baseHue + i * 40 + random(-15, 15)) % 360;
    let s = random(60, 95);
    let b = random(70, 100);
    palette.push([h, s, b]);
  }
}

// User Input: Keyboard Interaction
function keyPressed() 
{
  if (key === ' ' || keyCode === 32) 
  {
    generatePalette();
  } 
  else if (key === 's' || key === 'S') 
  {
    saveCanvas('generative_mandala', 'png');
  }
}