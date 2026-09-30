/*
  Name: Jeffery Chong
  Title: Catch the Glitch
  Instructions: 
    - Move your mouse over the moving glitch anomalies to "patch" them.
    - Click the mouse to instantly scramble the glitch's color palette.
    - Press any key to reset the system stability if it drops too low.
  Description: 
    This theme explores the theme of digital instability and human intervention. 
    A generative "glitch core" constantly threatens to destabilize the canvas, while the user 
    acts as a manual debugger, trying to keep the system balanced by tracking the anomaly.
*/

// 1. Declared variables
let glitchX;
let glitchY;
let glitchSize = 100
let systemStability = 50
let integrityColor = color(255, 255, 255);
let glitchSpeed = 10

function setup() {
  // Makes the canvas responsive to the initial window size
  createCanvas(800, 600);
  rectMode(CENTER);
  resetSystem();
}

function draw() {
  // Dark cyber background with a slight alpha trail for motion blur
  background(10, 15, 25, 40);

  // Calculate distance between mouse (user patcher) and the glitch core
  let distance = dist(mouseX, mouseY, glitchX, glitchY);

  // 2. Conditional statement using if, else if, and else
  if (distance < glitchSize / 2) {
    // User is successfully "catching" the glitch
    systemStability += 1.5; 
    integrityColor = color(0, 255, 150); // Healing Green
    
    // Slow down the glitch as it is being contained
    glitchX += random(-2, 2);
    glitchY += random(-2, 2);
  } else if (systemStability > 30) {
    // Glitch is loose and actively destabilizing the system
    systemStability -= 0.25;
    integrityColor = color(0, 195, 255); // Standard Cyber Blue
    
    // 3. Use of the random() function for chaotic glitch movement
    glitchX += random(-glitchSpeed, glitchSpeed);
    glitchY += random(-glitchSpeed, glitchSpeed);
  } else {
    // Critical Failure State: System stability is dangerously low (< 30%)
    systemStability -= 0.5;
    integrityColor = color(255, 50, 75); // Danger Red
    
    // Glitch becomes highly erratic and aggressive
    glitchX += random(-glitchSpeed * 2, glitchSpeed * 2);
    glitchY += random(-glitchSpeed * 2, glitchSpeed * 2);
    
    // Screen shake effect
    translate(random(-3, 3), random(-3, 3));
  }

  // Constrain variables to valid ranges
  systemStability = constrain(systemStability, 0, 100);
  glitchX = constrain(glitchX, 50, width - 50);
  glitchY = constrain(glitchY, 50, height - 50);

  // Draw the Glitch Core (Advanced concept: Generative digital artifacts)
  drawGlitchCore();

  // Draw HUD (Heads Up Display) showing system health
  drawHUD();
}

// Advanced Concept: Layered, procedural shapes creating a digitized glitch effect
function drawGlitchCore() {
  stroke(integrityColor);
  noFill();
  
  // Dynamic matrix lines pointing to the glitch
  strokeWeight(0.5);
  line(glitchX, 0, glitchX, height);
  line(0, glitchY, width, glitchY);

  // Layered digital squares
  for (let i = 0; i < 3; i++) {
    strokeWeight(random(1, 4));
    let offset = random(-15, 15);
    
    if (random(1) > 0.5) {
      fill(red(integrityColor), green(integrityColor), blue(integrityColor), 30);
    } else {
      noFill();
    }
    
    rect(glitchX + offset, glitchY + random(-10, 10), glitchSize * random(0.5, 1.2));
  }
}

function drawHUD() {
  noStroke();
  fill(255, 200);
  textSize(16);
  fontFamily = 'monospace';
  text(`SYSTEM INTEGRITY: ${floor(systemStability)}%`, 30, 40);
  
  // Health bar layout
  fill(40);
  rect(130, 60, 200, 10);
  fill(integrityColor);
  rectMode(CORNER);
  rect(30, 55, map(systemStability, 0, 100, 0, 200), 10);
  rectMode(CENTER); // Reset to center mode
  
  if (systemStability <= 0) {
    fill(255, 0, 0);
    textSize(32);
    text("SYSTEM COLLAPSE", width / 2 - 150, height / 2);
  }
}

// 4. Mouse Input
function mousePressed() {
  // Scramble the glitch size and speed when clicked, forcing it to mutate
  glitchSize = random(40, 120);
  glitchSpeed = random(5, 15);
  
  // Visual burst flash
  background(255, 50);
}

// 4. Keyboard Input
function keyPressed() {
  // Emergency reboot if things get out of hand
  resetSystem();
}

// Helper function to initialize/reset variables
function resetSystem() {
  glitchX = width / 2;
  glitchY = height / 2;
  glitchSize = 80;
  glitchSpeed = 8;
  systemStability = 100;
  integrityColor = color(0, 195, 255);
}

// Ensures responsiveness if the browser window size changes mid-experience
function windowResized() {
  resizeCanvas(800, 600);
  resetSystem();
}