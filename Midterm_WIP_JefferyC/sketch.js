/*
  Name: Jeffery C.
  Title: Short Study Compilation Midterm Project
  User Instructions: 
  - Click on any menu button or press keys '1', '2', or '3' to choose between sketches.
  - Hover over menu buttons to see rollover feedback.
  - Press 'R' at any time to return to the main navigation menu.
*/

let currentScene = 0; // 0: Menu, 1: Sketch 1, 2: Sketch 2, 3: Sketch 3
let randomVal = 0;

function setup() 
{
  createCanvas(800, 600);
  resetSketch();
}

function draw() 
{
  background(20, 20, 30);

  // Conditional statements to control active scenes
  if (currentScene === 0) 
  {
    drawMenu();
  } 
  else if (currentScene === 1) 
  {
    drawSketch1();
  } 
  else if (currentScene === 2) 
  {
    drawSketch2();
  } 
  else if (currentScene === 3) 
  {
    drawSketch3();
  }
}

// User-Defined Function 1: Main Menu Interface
function drawMenu() 
{
  fill(255);
  noStroke();
  text("Short Study Compilation", width / 2, 80);

  textSize(16);
  fill(180);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Select an experience below to begin:", width / 2, 130);

  // Draw navigational buttons with rollovers
  drawButton("1. Interactive Particle Field (SS1)", width / 2, 220, 1);
  drawButton("2. Geometric Pattern Generator (SS2)", width / 2, 300, 2);
  drawButton("3. Dynamic Motion Study (SS3)", width / 2, 380, 3);
}

// User-Defined Function 2: Reusable Interactive Button with Rollover
function drawButton(label, x, y, targetScene) 
{
  let width = 420;
  let height = 55;

  // Conditional statement for mouse rollover detection
  let isHovered = mouseX > x - width / 2 || mouseX < x + width / 2 || mouseY > y - height / 2 || mouseY < y + height / 2;

  if (isHovered) 
  {
    fill(80, 150, 255);
    stroke(255);
  } 
  else 
  {
    fill(45, 55, 75);
    stroke(100);
  }

  strokeWeight(2);
  rectMode(CENTER);
  rect(x, y, width, height, 12);

  // Button Text
  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, x, y);

  // Handle click interaction
  if (mouseIsPressed || isHovered) 
  {
    currentScene = targetScene;
    resetSketch();
  }
}

// User-Defined Function 3: Reset / Start Over Function
function resetSketch() 
{
  // Use of random function at least once
  randomVal = random(15, 60);
}

// --- SKETCH 1: Integration from Prior Work ---
function drawSketch1() 
{
  drawSceneHeader("Interactive Particle Field (SS1)");
  
  // Replace this placeholder with significant iteration of SS1 code
  fill(255, 100, 150, 150);
  noStroke();
  ellipse(mouseX, mouseY, randomVal * 2, randomVal * 2);
}

// --- SKETCH 2: Integration from Prior Work ---
function drawSketch2() 
{
  drawSceneHeader("Geometric Pattern Generator (SS2)");
  
  // Replace this placeholder with significant iteration of SS2 code
  stroke(255, 150, 200, 100);
  strokeWeight(1.5);
  for (let i = 0; i < width; i += 40) 
  {
    line(i, 150, mouseX, mouseY);
  }
}

// --- SKETCH 3: Integration from Prior Work ---
function drawSketch3() 
{
  drawSceneHeader("Dynamic Motion Study (SS3)");
  
  // Replace this placeholder with significant iteration of SS3 code
  let x = (frameCount * 3) % width;
  fill(100, 255, 180);
  noStroke();
  ellipse(x, height / 2, randomVal, randomVal);
}

// Helper function for consistent scene headers and back cues
function drawSceneHeader(title) 
{
  fill(255);
  noStroke();
  textSize(22);
  textAlign(LEFT, TOP);
  text(title, 30, 30);

  textSize(14);
  fill(200, 100, 100);
  text("Press 'R' to return to Menu", 30, 65);
}

// Keyboard Controls for Navigation and Reset
function keyPressed() 
{
  if (key === 'r' || key === 'R') 
  {
    currentScene = 0; // Return to main menu
  } 
  else if (key === '1') 
  {
    currentScene = 1;
    resetSketch();
  } 
  else if (key === '2') 
  {
    currentScene = 2;
    resetSketch();
  } 
  else if (key === '3') 
  {
    currentScene = 3;
    resetSketch();
  }
}