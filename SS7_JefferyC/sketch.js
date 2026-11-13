/*
  Name: Jeffery Chong
  Title: Short Study #7 - Interactive Node Network (OOP)
  Short Study #7: OOP
  
  Instructions to User:
  - Move your mouse across the canvas to watch the floating nodes react and connect.
  - Click anywhere on the canvas to spawn a new node at your cursor position.
  - Press 'R' or 'r' on your keyboard to reset and clear extra nodes.
*/

// Declare an array to hold multiple instances of our custom class
let nodes = [];
const INITIAL_NODE_COUNT = 5;

function setup() 
{
  // Create a responsive canvas centered in the window
  createCanvas(800, 600);
  
  // Instantiate initial objects and store them in our array
  for (let i = 0; i < INITIAL_NODE_COUNT; i++) 
  {
    let rx = random(width);
    let ry = random(height);
    // Push a new instance of FloatingNode into the array
    nodes.push(new FloatingNode(rx, ry));
  }
}

function draw() 
{
  // Semi-transparent background creates a trailing motion blur effect
  background(15, 20, 30, 200);
  
  // Loop through the array of objects to update, display, and connect them
  for (let i = 0; i < nodes.length; i++) 
  {
    nodes[i].update();      // Method 1: Update position and physics
    nodes[i].display();     // Method 2: Render visual representation
    nodes[i].checkEdges();  // Method 3: Handle boundary wrapping
  }
  
  // Optional extra: Draw connecting lines between nodes close to each other
  drawConnections();
  
  // Display helper UI text
  fill(255, 150);
  noStroke();
  textSize(14);
  text("Nodes active: " + nodes.length, 20, 30);
  text("Click to spawn node | Press 'R' to reset", 20, 55);
}

// ==========================================
// CLASS DEFINITION
// ==========================================
class FloatingNode 
{
  // Constructor initializes properties for each object instance
  constructor(tempX, tempY) 
  {
    this.x = tempX;
    this.y = tempY;
    this.vx = random(-1.5, 1.5); // Horizontal velocity
    this.vy = random(-1.5, 1.5); // Vertical velocity
    this.dia = random(20, 45);   // Diameter/Size
    this.col = color(random(100, 255), random(150, 220), random(200, 255), 180);
  }

  // Method 1: Update position based on velocity
  update() 
  {
    this.x += this.vx;
    this.y += this.vy;
    
    // Subtle oscillation effect on size
    this.dia += sin(frameCount * 0.05) * 0.2;
  }

  // Method 2: Render the object onto the canvas
  display() 
  {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.dia);
    
    // Inner core for visual depth
    fill(255, 150);
    ellipse(this.x, this.y, this.dia * 0.3);
  }

  // Method 3: Keep objects inside canvas boundaries by wrapping around
  checkEdges() 
  {
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Draw lines between nodes if they are within a certain proximity threshold
function drawConnections() 
{
  stroke(255, 50);
  strokeWeight(1);
  for (let i = 0; i < nodes.length; i++) 
  {
    for (let j = i + 1; j < nodes.length; j++) 
    {
      let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      if (d < 120) 
      {
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      }
    }
  }
}

// User Interaction: Spawn a new object on mouse click
function mousePressed() 
{
  // Ensure click is within canvas bounds
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) 
  {
    nodes.push(new FloatingNode(mouseX, mouseY));
  }
}

// User Interaction: Reset sketch with 'r' or 'R' key
function keyPressed() 
{
  if (key === 'r' || key === 'R') 
  {
    nodes = [];
    for (let i = 0; i < INITIAL_NODE_COUNT; i++) 
    {
      nodes.push(new FloatingNode(random(width), random(height)));
    }
  }
}