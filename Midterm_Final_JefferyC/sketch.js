/*
  Name: Jeffery Chong
  Title: Expanded Short Study Midterm Project (Final)
  Goal: Neutralize incoming corrupted data nodes or viruses before they breach the core.
  User Instructions:
  - State Change 1 (Menu): Press [ENTER] to initialize the system.
  - State Change 2 (Running): Move your mouse to steer crosshairs, click to neutralize data 
  glitches, and hold [SPACEBAR] to execute a System Purge.
  - State Change 3 (Overload/Victory): Press [R] to reset the system cache and restart from 
  the menu.
*/

let gameState = "MENU"; // States: "MENU", "RUNNING", "OVERLOAD", "VICTORY"
let corePulseSize = 10;
let signalVelocity = 1.5;
let stabilityLevel = 100;
let score = 0;
let telemetryParticles = [];
let corruptionNodes = [];

function setup() 
{
  createCanvas(800, 600);
  textFont("Courier Prime");
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
  else if (gameState === "VICTORY")
  {
    drawVictoryState();
  }
}

// Initialize random telemetry particles
function initializeParticles() 
{
  telemetryParticles = [];
  corruptionNodes = [];
  score = 0;
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

// Draw background grid overlay
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

// Reset system state
function resetSystem() 
{
  gameState = "MENU";
  corePulseSize = 10;
  signalVelocity = 1.5;
  stabilityLevel = 100;
  score = 0;
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
  text("CYBERNETIC BIOSPHERE", width / 2, height / 2 - 80);
  text("CORE DEFENSE - MK II", width / 2, height / 2 - 45);
  
  fill(0, 150, 255);
  textSize(14);
  text("Objective: Neutralize incoming corruption nodes before they breach the core.", width / 2, height / 2 - 5);
  text("Status: SYSTEM STANDBY", width / 2, height / 2 + 30);
  
  // Pulsing prompt text using sine wave
  fill(255, 255, 255, sin(frameCount * 0.1) * 127 + 128);
  text(">> PRESS [ENTER] TO INITIALIZE SYSTEM <<", width / 2, height / 2 + 80);
  
  textAlign(LEFT, BASELINE);
}

function drawRunningState() 
{
  background(10, 15, 25, 60);
  drawGridOverlay();
  
  // Update and render random telemetry particles
  noStroke();
  for (let p of telemetryParticles) 
  {
    p.y -= p.speed;
    if (p.y < 0) p.y = height;
    fill(0, 255, 180, 100);
    ellipse(p.x, p.y, p.size, p.size);
  }
  
  // Spawn corruption nodes periodically
  if (frameCount % 50 === 0 || corruptionNodes.length < 10) 
  {
    let spawnAngle = random(TWO_PI);
    let spawnDist = width * 0.5;
    corruptionNodes.push
    ({
      x: width / 2 + cos(spawnAngle) * spawnDist,
      y: height / 2 + sin(spawnAngle) * spawnDist,
      size: 24,
      speed: random(1.0, 1.0)
    });
  }
  
  // Update and draw corruption nodes moving toward the center
  for (let i = corruptionNodes.length - 1; i >= 0; i--) 
  {
    let node = corruptionNodes[i];
    let angleToCenter = atan2(height / 2 - node.y, width / 2 - node.x);
    node.x += cos(angleToCenter) * node.speed;
    node.y += sin(angleToCenter) * node.speed;
    
    // Draw glitch node
    fill(255, 0, 128, 200);
    stroke(255, 255, 255, 150);
    strokeWeight(1.5);
    ellipse(node.x, node.y, node.size, node.size);
    
    // Check if node reached the core
    let distToCore = dist(node.x, node.y, width / 2, height / 2);
    if (distToCore < corePulseSize * 0.5) 
    {
      corruptionNodes.splice(i, 1);
      stabilityLevel -= 15; // Breach damages stability
    }
  }
  
  // Core pulse dynamics
  corePulseSize += signalVelocity;
  if (corePulseSize > 120) 
  {
    corePulseSize = 30;
  }
  
  noFill();
  stroke(0, 255, 180, 120);
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
  text("SCORE: " + score + " / 500", 20, 50);
  text("STABILITY: " + int(stabilityLevel) + "%", 20, 70);
  text("HOLD [SPACE] FOR SYSTEM PURGE", 20, height - 20);
  
  // Check win/loss conditions
  if (stabilityLevel <= 0) 
  {
    gameState = "OVERLOAD";
  }
  else if (score >= 500)
  {
    gameState = "VICTORY";
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
  text("Bio-data corruption breached the core. Final Score: " + score, width / 2, height / 2 - 10);
  
  fill(255, 255, 255, sin(frameCount * 0.15) * 127 + 128);
  text(">> PRESS [R] TO REBOOT SYSTEM CACHE <<", width / 2, height / 2 + 40);
  
  textAlign(LEFT, BASELINE);
}

function drawVictoryState() 
{
  background(5, 30, 20);
  drawGridOverlay();
  
  noStroke();
  fill(0, 255, 180);
  textSize(26);
  textAlign(CENTER, CENTER);
  text("BIOSPHERE STABILIZED", width / 2, height / 2 - 50);
  
  fill(200, 255, 230);
  textSize(14);
  text("All sector anomalies cleared successfully. Final Score: " + score, width / 2, height / 2 - 10);
  
  fill(255, 255, 255, sin(frameCount * 0.15) * 127 + 128);
  text(">> PRESS [R] TO REBOOT SYSTEM CACHE <<", width / 2, height / 2 + 40);
  
  textAlign(LEFT, BASELINE);
}

function mousePressed() 
{
  if (gameState === "RUNNING") 
  {
    // Check if player clicked any corruption nodes
    let hitAny = false;
    for (let i = corruptionNodes.length - 1; i >= 0; i--) 
    {
      let node = corruptionNodes[i];
      if (dist(mouseX, mouseY, node.x, node.y) < node.size) 
      {
        corruptionNodes.splice(i, 1);
        score += 20;
        stabilityLevel = min(100, stabilityLevel + 3); // Small reward for successful defense
        hitAny = true;
        break;
      }
    }
    
    // Visual feedback for click
    fill(255, 255, 255, 200);
    noStroke();
    ellipse(mouseX, mouseY, 40, 40);
  }
}

function keyPressed() 
{
  if (gameState === "MENU" || keyCode === ENTER) 
  {
    gameState = "RUNNING";
  } 
  else if (gameState === "RUNNING" || key === " ") 
  {
    // Stress test / System Purge action clears screen nodes at a stability cost
    stabilityLevel -= 10;
    score += corruptionNodes.length * 10;
    corruptionNodes = [];
  } 
  else if ((gameState === "OVERLOAD" || gameState === "VICTORY") || (key === "r" || key === "R")) 
  {
    resetSystem(); // Restarts from beginning
  }
}