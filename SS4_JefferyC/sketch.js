/*
  Name: Jeffery Chong
  Title: Solar Bloom & Time-based Day-Night Cycle
  Theme: Celestial rhythm and blooming nature using time-based progression.
  Instructions:
    - Watch the central sunflower transition through phases based on elapsed time (`millis()`).
    - Move your mouse horizontally across the canvas to control the size/scale of the blooming effect.
*/

let sunflowerImg;
let startTime;

async function setup() 
{
  createCanvas(600, 600);
  imageMode(CENTER);
  textAlign(LEFT, TOP);
  textSize(18);
  
  // Using p5.js v2 async/await pattern instead of deprecated preload()
  sunflowerImg = await loadImage("assets/sunflower.jpg");
  
  startTime = millis();
}

function draw() 
{
  let elapsedTime = millis() - startTime;
  
  // Conditional statement based on timed events using millis()
  // Cycle background and theme every 10 seconds (10000 ms)
  let cycleTime = elapsedTime % 10000;
  
  if (cycleTime < 5000) 
  {
    // Day Mode
    background(135, 206, 235);
    fill(40);
    text("Phase: Daytime Bloom", 20, 20);
  } 
  else 
  {
    // Night Mode
    background(20, 24, 54);
    fill(240);
    text("Phase: Nighttime Rest", 20, 20);
  }
  
  // Display timer info
  textSize(14);
  text("Elapsed Time: " + floor(elapsedTime / 1000) + "s", 20, 50);
  text("Interactive Mouse X: " + floor(mouseX), 20, 70);

  // Responsive image positioning and dynamic sizing
  let baseSize = min(width, height) * 0.4;
  let dynamicScale = map(mouseX, 0, width, 0.8, 1.4, true);
  let imgWidth = baseSize * dynamicScale;
  let imgHeight = baseSize * dynamicScale;

  // Render the external sunflower image
  image(sunflowerImg, width / 2, height / 2, imgWidth, imgHeight);
}

function windowResized() 
{
  resizeCanvas(600, 600);
}