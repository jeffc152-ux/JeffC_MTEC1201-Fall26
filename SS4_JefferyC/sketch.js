/*
  Name: Jeffery Chong
  Title: Catch the Glitch
  Instructions: 
    - Move your mouse over the screen to search for the shifting glitch.
    - Click and hold the mouse button to "overclock" the system and intensify the corruption.
    - Press the 'R' or 'r' key to completely reset the system's baseline color palette.
  Description: 
    This concept/theme explores the aesthetic of digital decay, cyber-fragmentation, 
    and system instability. By monitoring the mouse's velocity and position, the sketch 
    proconstructs a dynamic canvas that responds to user urgency, leaving behind artifacts 
    of a visual system struggling to maintain its structure.
*/

// Declared variables for system state, positions, and colors
let glitchX;
let glitchY;
let particleSize;
let systemStability;
let systemSpeed = 5;
let baseHue;
let scanlineY = 0;

function setup() {
  // Makes the canvas fully responsive to the initial window size
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  
  // Initialize variable values
  glitchX = width / 2;
  glitchY = height / 2;
  baseHue = random(180, 280); // Starts with cyber blues/purples
}

function draw() {
  // Semi-transparent background creates a digital trailing/ghosting effect
  background(0, 0, 0, 12);
  
  // Calculate mouse speed to drive the glitch behavior dynamically
  let mouseVelocity = dist(mouseX, mouseY, pmouseX, pmouseY);
  
  // Update glitch position using random offsets scaled by mouse movement
  glitchX += random(-systemSpeed, systemSpeed) * (mouseVelocity * 0.1 + 1);
  glitchY += random(-systemSpeed, systemSpeed) * (mouseVelocity * 0.1 + 1);
  
  // Keep the glitch within the responsive canvas boundaries
  glitchX = constrain(glitchX, 0, width);
  glitchY = constrain(glitchY, 0, height);
  
  // Calculate distance from user to the core glitch
  let distanceToGlitch = dist(mouseX, mouseY, glitchX, glitchY);
  
  /* 
    Conditional Statement: Complex system stability evaluation 
    Triggers different visual states based on user proximity to the glitch
  */
  if (distanceToGlitch < 80) {
    // Critical Breach State: User is very close
    systemStability = "CRITICAL";
    particleSize = random(40, 120);
    fill(random(0, 30), 90, 100, 80); // High-alert reds and oranges
    stroke(255);
    strokeWeight(random(1, 4));
  } else if (distanceToGlitch >= 80 && distanceToGlitch < 250) {
    // Unstable State: User is tracking the glitch
    systemStability = "UNSTABLE";
    particleSize = random(15, 50);
    fill((baseHue + random(-30, 30)) % 360, 85, 90, 60); // Shifting base colors
    stroke((baseHue + 120) % 360, 80, 90, 50);
    strokeWeight(1);
  } else {
    // Nominal Idle State: User is far away
    systemStability = "NOMINAL";
    particleSize = random(5, 15);
    fill(baseHue, 40, 50, 30); // Dimmer, subdued tones
    noStroke();
  }
  
  // Draw the core glitch artifacts based on the state calculated above
  rectMode(CENTER);
  rect(glitchX, glitchY, particleSize * 2, particleSize * 0.5);
  ellipse(glitchX + random(-20, 20), glitchY + random(-20, 20), particleSize);
  
  // Advanced Interactive Concept: Mouse Input (Clicking alters the time-step)
  if (mouseIsPressed) {
    // "Overclock" mode draws severe horizontal matrix fragments
    stroke(random(360), 90, 100, 40);
    line(0, glitchY + random(-50, 50), width, glitchY + random(-50, 50));
    line(glitchX + random(-50, 50), 0, glitchX + random(-50, 50), height);
  }
  
  // Draw scrolling cyber scanlines for environmental texture
  stroke(0, 0, 100, 8);
  strokeWeight(1);
  line(0, scanlineY, width, scanlineY);
  scanlineY = (scanlineY + 3) % height;
  
  // Display a modern HUD element tracking the system values
  noStroke();
  fill(0, 0, 100, 70);
  textSize(14);
  textFont('monospace');
  text(`SYS_STATUS: ${systemStability}`, 20, 30);
  text(`GLITCH_COORD: [${floor(glitchX)}, ${floor(glitchY)}]`, 20, 50);
  text(`DIST_TO_TARGET: ${floor(distanceToGlitch)}px`, 20, 70);
}

// Interactive Concept: Keyboard Input to shift the base parameters
function keyPressed() {
  if (key === 'R' || key === 'r') {
    baseHue = random(0, 360); // Randomizes the target color anchor completely
    background(0); // Instantly clears the trail matrix
  }
}

// Responsiveness: Automatically resizes the canvas if the browser window changes
function windowResized() {
  resizeCanvas(800, 600);
  background(0);
}