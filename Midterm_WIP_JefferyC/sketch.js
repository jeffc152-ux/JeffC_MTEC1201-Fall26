/*
  * Name: Jeffery Chong
  * Title: Interactive User Experience (Midterm Project)
  * User Instructions:
  *   - Start at the Main Menu by clicking on any of the three preview cards.
  *   - Experience 1 (Particle Flow): Move your mouse to interact with organic, 
    randomly generated floating particles. Press 'R' to reset particles.
  *   - Experience 2 (Dynamic Waves): Watch sine/cosine waves morph based on 
    mouse position. Click anywhere to randomize wave frequencies.
  *   - Experience 3 (Interactive Grid): Click grid cells to toggle their states 
    and colors.
  *   - Global Navigation: Press 'M' at any time to return to the Main Menu.
*/

let currentMode = "MENU"; // States: "menu", "exp1", "exp2", "exp3"

// Experience 1 Variables (Particles)
let particles = [];
let numParticles = 75;

// Experience 2 Variables (Waves)
let waveAngle = 0.0;
let waveSpeed = 0.05;
let baseFreq = 0.02;

// Experience 3 Variables (Grid)
let cols = 10;
let rows = 10;
let grid = [];
let cellSize = 40;

function setup() {
  createCanvas(800, 600);
  initializeParticles();
  initializeGrid();
}

function draw() {
  background(20, 20, 30);

  // Conditional state router
  if (currentMode === "menu") {
    drawMainMenu();
  } else if (currentMode === "exp1") {
    runParticleFlow();
  } else if (currentMode === "exp2") {
    runDynamicWaves();
  } else if (currentMode === "exp3") {
    runInteractiveGrid();
  }
  
  // Draw global return-to-menu prompt if inside an experience
  if (currentMode !== "menu") {
    drawReturnPrompt();
  }
}

// ==========================================
// NAVIGATION & MENU FUNCTIONS
// ==========================================

function drawMainMenu() {
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(32);
  text("Interactive User Experience Suite", width / 2, 80);
  
  textSize(16);
  fill(180, 180, 200);
  text("Select an experience below or click to navigate", width / 2, 120);

  // Draw Menu Cards
  drawMenuCard(150, 220, 150, 220, "Particle Flow", "Organic Motion");
  drawMenuCard(325, 220, 150, 220, "Dynamic Waves", "Sine & Cosine");
  drawMenuCard(500, 220, 150, 220, "Interactive Grid", "Click & Toggle");
}

function drawMenuCard(x, y, w, h, title, subtitle) {
  let isHovered = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  
  // Card background with rollover effect
  if (isHovered) {
    fill(70, 130, 200);
    stroke(255);
  } else {
    fill(40, 44, 60);
    stroke(100, 110, 140);
  }
  strokeWeight(2);
  rect(x, y, w, h, 12);

  // Card Text
  noStroke();
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(title, x + w / 2, y + h / 2 - 15);
  
  textSize(12);
  fill(200, 200, 220);
  text(subtitle, x + w / 2, y + h / 2 + 15);
}

function drawReturnPrompt() {
  fill(255, 200);
  noStroke();
  textSize(14);
  textAlign(LEFT, BOTTOM);
  text("Press 'M' or click here to return to Menu", 20, 20);
}