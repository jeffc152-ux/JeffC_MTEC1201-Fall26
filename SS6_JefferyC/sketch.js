/*
  Name: Jeffery Chong
  Title: Short Study #6
  Instructions:
    - Click anywhere on the canvas to add a new ripple node and trigger a audio pitch.
    - Press the 'C' key on your keyboard to clear all active nodes.
    - Press the 'R' key to clear and generate a batch of random nodes.
*/

// Array 1: Stores objects containing coordinates, size, pulse velocity, and tone parameters
let nodes = [];

// Array 2: Pre-defined chromatic pitch frequencies (Hz) used to calculate color & sound response
let frequencies = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100, 1);
  rectMode(CENTER);

  // Initialize sketch with 3 nodes generated via user-defined helper
  for (let i = 0; i < 3; i++) {
    addNode(random(width * 0.2, width * 0.8), random(height * 0.2, height * 0.8));
  }
}

function draw() {
  background(230, 20, 10, 0.2); // Soft trail effect

  // Loop through Array 1 using .length property
  for (let i = 0; i < nodes.length; i++) {
    let n = nodes[i];

    // Expand concentric ring pulse
    n.currentRadius += n.expandRate;
    if (n.currentRadius > n.maxRadius || n.currentRadius < 0) {
      n.expandRate *= -1; // Bounce expansion
    }

    // Determine color mapped from pitch index stored in object
    let hueVal = map(n.freqIndex, 0, frequencies.length - 1, 180, 340);

    // Draw visual ripple lines connecting to neighbor nodes
    stroke(hueVal, 70, 90, 0.3);
    strokeWeight(1);
    if (i > 0) {
      line(n.x, n.y, nodes[i - 1].x, nodes[i - 1].y);
    }

    // Draw node geometry
    noFill();
    stroke(hueVal, 80, 100, 0.8);
    strokeWeight(2);
    ellipse(n.x, n.y, n.currentRadius * 2);

    fill(hueVal, 90, 90);
    noStroke();
    circle(n.x, n.y, n.baseSize);
  }

  // Visual Overlay: Display active array count
  drawInterface();
}

// User Input: Mouse Interaction
function mousePressed() {
  // Prevent adding nodes if user clicks on UI overlay text area
  if (mouseY > 65) {
    addNode(mouseX, mouseY);
  }
}

// User Input: Keyboard Interaction
function keyPressed() {
  // Clear array completely
  if (key === 'c' || key === 'C') {
    nodes = [];
  }

  // Reset and spawn random nodes using int() typecasting for array length
  if (key === 'r' || key === 'R') {
    nodes = [];
    let count = int(random(5, 12)); // int() ensures integer loop bounds
    for (let i = 0; i < count; i++) {
      addNode(random(width), random(height));
    }
  }
}

// Custom function pushing objects into Array 1
function addNode(x, y) {
  // Use int() to constrain randomized frequency pick to valid array indices
  let selectedFreqIndex = int(random(0, frequencies.length));

  let newNode = {
    x: x,
    y: y,
    baseSize: random(8, 16),
    currentRadius: 5,
    maxRadius: random(40, 120),
    expandRate: random(0.5, 2.5),
    freqIndex: selectedFreqIndex
  };

  // Using array.push() to insert new data structure into the array
  nodes.push(newNode);
}