/*
  Name: Jeffery Chong
  Title: Cybernetic Biosphere: Control Room Alpha - Expanded Short Study
  User Instructions:
  - State 1 (Menu): Press [ENTER] to initialize the system.
  - State 2 (Running): Move your mouse to steer crosshairs, click to pulse bio-nodes, and press [SPACEBAR] to run a system stress test.
  - State 3 (Overload): Press [R] to reset the system cache and restart from the menu.
*/

let gameState = "MENU"; // States: "MENU", "RUNNING", "OVERLOAD"
let corePulseSize = 10;
let signalVelocity = 1.5;
let stabilityLevel = 100;
let telemetryParticles = [];

function setup() 
{
  createCanvas(800, 600);
  textFont("Palatino Linotype");
  initializeParticles();
}

function draw() 
{
  // Main state machine handler
  if (gameState === "MENU") 
  {
    drawMenuState();
  } 
  else if (gameState === "RUNNING") 
  {
    drawRunningState();
  } 
  else if (gameState === "OVERLOAD") 
  {
    drawOverloadState();
  }
}

// User-Defined Function 1: Initialize random telemetry particles
function initializeParticles() 
{
  telemetryParticles = [];
  for (let i = 0; i < 40; i++) 
  {
    telemetryParticles.push
    ({
      x: random(width),
      y: random(height),
      speed: random(0.5, 2),
      size: random(2, 5)
    });
  }
}

// User-Defined Function 2: Draw background grid overlay
function drawGridOverlay() 
{
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
}

// User-Defined Function 3: Reset system state (Starts over without exiting)
function resetSystem() 
{
  gameState = "MENU";
  corePulseSize = 10;
  signalVelocity = 1.5;
  stabilityLevel = 100;
  initializeParticles();
}

function drawMenuState() 
{
  background(10, 15, 25);
  drawGridOverlay();
  
  noStroke();
  fill(0, 255, 180);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("CYBERNETIC BIOSPHERE", width / 2, height / 2 - 60);
  text("CONTROL ROOM ALPHA - MK II", width / 2, height / 2 - 25);
  
  fill(0, 150, 255);
  textSize(14);
  text("Status: SYSTEM STANDBY", width / 2, height / 2 + 20);
  
  // Pulsing prompt text using sine wave
  fill(255, 255, 255, sin(frameCount * 0.1) * 127 + 128);
  text(">> PRESS [ENTER] TO INITIALIZE SYSTEM <<", width / 2, height / 2 + 70);
  
  textAlign(LEFT, BASELINE);
}

function drawRunningState() 
{
  background(10, 15, 25, 40);
  drawGridOverlay();
  
  // Update and render random telemetry particles
  noStroke();
  for (let p of telemetryParticles) 
  {
    p.y -= p.speed;
    if (p.y < 0) p.y = height;
    
    // Conditional statement for random glitch flicker effect
    if (random(1) > 0.98) 
    {
      fill(255, 0, 128);
    } 
    else 
    {
      fill(0, 255, 180, 150);
    }
    ellipse(p.x, p.y, p.size, p.size);
  }
  
  // Core pulse dynamics
  corePulseSize += signalVelocity;
  if (corePulseSize > width / 2) 
  {
    corePulseSize = 10;
  }
  
  noFill();
  stroke(0, 255, 180, 100);
  strokeWeight(2);
  ellipse(width / 2, height / 2, corePulseSize, corePulseSize);
  ellipse(width / 2, height / 2, corePulseSize * 0.5, corePulseSize * 0.5);

  // Mouse tracking crosshairs
  stroke(255, 0, 128, 150);
  strokeWeight(1.5);
  line(mouseX, mouseY, pmouseX, pmouseY); 
  
  stroke(0, 150, 255, 200);
  line(mouseX - 20, mouseY, mouseX + 20, mouseY);
  line(mouseX, mouseY - 20, mouseX, mouseY + 20);
  
  // HUD interface text
  noStroke();
  fill(0, 150, 255);
  textSize(12);
  text("SYSTEM: ACTIVE", 20, 30);
  text("CORE_SIZE: " + nfc(corePulseSize, 1), 20, 50);
  text("STABILITY: " + int(stabilityLevel) + "%", 20, 70);
  text("PRESS [SPACE] FOR STRESS TEST", 20, height - 20);
  
  // Conditional check for system overload state trigger
  if (stabilityLevel <= 0) 
  {
    gameState = "OVERLOAD";
  }
}

function drawOverloadState() 
{
  background(40, 5, 10);
  drawGridOverlay();
  
  // Flashing warning border
  if (frameCount % 30 < 15) 
  {
    stroke(255, 0, 50, 200);
    strokeWeight(6);
    noFill();
    rect(10, 10, width - 20, height - 20);
  }
  
  noStroke();
  fill(255, 50, 50);
  textSize(26);
  textAlign(CENTER, CENTER);
  text("CRITICAL SYSTEM OVERLOAD", width / 2, height / 2 - 50);
  
  fill(255, 200, 200);
  textSize(14);
  text("Bio-data corruption detected. Core integrity compromised.", width / 2, height / 2 - 10);
  
  fill(255, 255, 255, sin(frameCount * 0.15) * 127 + 128);
  text(">> PRESS [R] TO REBOOT SYSTEM CACHE <<", width / 2, height / 2 + 40);
  
  textAlign(LEFT, BASELINE);
}

function mousePressed() 
{
  if (gameState === "RUNNING") 
  {
    fill(255, 255, 255, 200);
    noStroke();
    ellipse(mouseX, mouseY, 60, 60);
    signalVelocity += 0.5; 
    stabilityLevel -= 5; // Interacting lowers system stability
  }
}

function keyPressed() 
{
  if (gameState === "MENU" || keyCode === ENTER) 
  {
    gameState = "RUNNING";
  } 
  else if (gameState === "RUNNING" || key === "SPACE") 
  {
    // Stress test action
    stabilityLevel -= 25;
    signalVelocity += 1.0;
  } 
  else if (gameState === "OVERLOAD" || (key === "r" || key === "R")) 
  {
    resetSystem(); // Restarts from beginning without exiting program
  }
}