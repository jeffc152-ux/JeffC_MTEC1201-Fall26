/*
  Name: Jeffery Chong
  Title: Catch the Glitch
  Instructions: Move your mouse to hover over the glitching square to "stabilize" it. 
                Press any key on your keyboard to trigger an emergency system reboot.
  Description: This sketch explores the theme of digital instability and human intervention. 
               The 'glitch' behaves erratically using randomized states, and the user acts 
               as an anti-virus agent attempting to capture and neutralize the system error.
*/

// 1. Declared Variables
let glitchX;          // X position of the glitch
let glitchY;          // Y position of the glitch
let glitchSize;        // Responsive size of the glitch
let systemStatus;      // State of the system: "ERRATIC", "STABLE", or "REBOOT"
let glitchColor;       // Dynamic color variable
let stabilityTimer = 0; // Tracks how long the user has contained the glitch

function setup() {
  // Makes the canvas responsive to the initial window size
  createCanvas(800, 600);
  rectMode(CENTER);
  resetGlitch();
}

function draw() {
  // Deep cyber-grid background color
  background(10, 15, 25);
  
  // Calculate responsive sizing based on canvas width
  glitchSize = width * 0.08; 

  // Measure the distance between the mouse and the glitch
  let distance = dist(mouseX, mouseY, glitchX, glitchY);

  // 2. Conditional Statements (if, else if, else)
  if (keyIsPressed) {
    // If a keyboard key is held, trigger a system reboot
    systemStatus = "REBOOT";
  } else if (distance < glitchSize / 2) {
    // If the mouse is hovering inside the glitch boundaries
    systemStatus = "STABLE";
    stabilityTimer++;
  } else {
    // Default state: the glitch is active and loose
    systemStatus = "ERRATIC";
    if (stabilityTimer > 0) stabilityTimer--; // Lose stability progress
  }

  // 3. Render and Behavior based on System Status
  if (systemStatus === "REBOOT") {
    // Visual style for Reboot
    background(0, 255, 100, 50); // Flash green Matrix-style screen
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("SYSTEM REBOOT IN PROGRESS...", width / 2, height / 2);
    
    // Slow down and center the glitch during reboot
    glitchX = lerp(glitchX, width / 2, 0.1);
    glitchY = lerp(glitchY, height / 2, 0.1);
    
  } else if (systemStatus === "STABLE") {
    // Visual style for Stable (Captured)
    glitchColor = color(0, 220, 255, 200); // Cool cyan cyan
    fill(glitchColor);
    stroke(255);
    strokeWeight(2);
    rect(glitchX, glitchY, glitchSize, glitchSize);
    
    // Add a visual "containment ring" that shrinks as it stabilizes
    noFill();
    stroke(0, 220, 255);
    let ringSize = glitchSize * (1 + sin(frameCount * 0.1) * 0.2);
    ellipse(glitchX, glitchY, ringSize);

  } else {
    // Visual style for Erratic (Glitching)
    // Use random() to simulate a broken, vibrating digital entity
    glitchX += random(-15, 15);
    glitchY += random(-15, 15);
    
    // Keep the glitch within the screen boundaries
    glitchX = constrain(glitchX, glitchSize, width - glitchSize);
    glitchY = constrain(glitchY, glitchSize, height - glitchSize);

    // Randomize colors rapidly for a true glitch aesthetic
    glitchColor = color(random(200, 255), random(0, 100), random(100, 255), random(150, 255));
    fill(glitchColor);
    noStroke();
    
    // Draw erratic offset rectangles to simulate screen tearing
    rect(glitchX + random(-10, 10), glitchY, glitchSize, glitchSize * random(0.8, 1.2));
    
    // Occasionally teleport the glitch to mimic extreme data lag
    if (random(1) < 0.02) {
      resetGlitch();
    }
  }

  // Draw UI Layer
  drawUI();
}

// 4. Responsive Canvas handling
function windowResized() {
  resizeCanvas(800, 600);
}

// Helper function to randomize position using random()
function resetGlitch() {
  glitchX = random(width * 0.2, width * 0.8);
  glitchY = random(height * 0.2, height * 0.8);
}

// Concept development: UI overlay showing system diagnostics
function drawUI() {
  fill(255, 150);
  textSize(14);
  textAlign(LEFT, TOP);
  textFont('Courier New');
  
  text(`SYSTEM_STATUS: ${systemStatus}`, 20, 20);
  text(`CONTAINMENT_LEVEL: ${stabilityTimer}%`, 20, 40);
  
  // Draw a progress bar for containment
  stroke(255, 50);
  noFill();
  rect(120, 75, 200, 10);
  fill(glitchColor);
  noStroke();
  let barWidth = map(constrain(stabilityTimer, 0, 100), 0, 100, 0, 200);
  rect(120, 75, barWidth, 10);
}