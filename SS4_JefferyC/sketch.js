/*
  Name: Jeffery Chong
  Title: Solar Bloom
  Instructions:
  - Click anywhere on the canvas to trigger an instant solar glow pulse.
  - Hover near the center to make the sunflower react, enlarge, and smoothly fade to full opacity.
  - Watch the day/night sky cycle transition automatically over time using millis().
*/

let sunflower;
let lastPulseTime = 0;
let pulseDuration = 1000; // pulse effect lasts 1 second

let opacity = 0; 
let fade = 1;

async function setup() 
{
  createCanvas(600, 600);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);

  sunflower = await loadImage("assets/sunflower.png");
}

function draw() {
  let currentTime = millis();

  // Dynamic sky background color cycling over a 10-second period
  let cycleTime = currentTime % 10000;
  let bgBrightness;
  if (cycleTime < 5000) 
  {
    // Day phase
    bgBrightness = map(cycleTime, 0, 5000, 180, 50);
  } 
  else 
  {
    // Night phase
    bgBrightness = map(cycleTime, 5000, 10000, 50, 180);
  }
  background(20, 30, bgBrightness);

  // Interactive proximity logic
  let d = dist(mouseX, mouseY, width / 2, height / 2);
  let sunflowerScale = 1.0;
  let targetOpacity = 180;

  if (d < 150) 
  {
    sunflowerScale = 1.15;
    targetOpacity = 255; // Target full opacity when hovering
  } 
  else 
  {
    sunflowerScale = 1.0;
    targetOpacity = 120; // Target lower opacity when idle
  }

  // Smooth opacity fade transition using the explicit `fade` step variable
  opacity = lerp(opacity, targetOpacity, fade);

  // Draw external image with dynamic opacity and scale
  push();
  translate(width / 2, height / 2);
  scale(sunflowerScale);
  tint(255, opacity); // Uses the explicit `opacity` variable
  if (sunflower) 
  {
    image(sunflower, 0, 0, 300, 300);
  }
  pop();

  // Timed Event: Solar pulse effect with fading stroke alpha
  if (currentTime - lastPulseTime < pulseDuration) {
    let alpha = map(currentTime - lastPulseTime, 0, pulseDuration, 255, 0);
    noFill();
    stroke(255, 204, 0, alpha);
    strokeWeight(8);
    let radius = map(currentTime - lastPulseTime, 0, pulseDuration, 300, 500);
    ellipse(width / 2, height / 2, radius, radius);
  }

  // Display UI overlay text with soft pulsing text opacity
  let textOpacity = map(sin(currentTime * 0.002), -1, 1, 150, 255);
  noStroke();
  fill(255, textOpacity);
  textSize(24);
  text("Solar Bloom", width / 2, 40);

  textSize(14);
  text("Time Elapsed: " + nf(currentTime / 1000, 0, 1) + "s", width / 2, 75);
  text("Click to trigger solar pulse | Hover over flower to interact", width / 2, height - 30);
}

function mousePressed() 
{
  // Store the timestamp of click for the timed event
  lastPulseTime = millis();
}

function windowResized() 
{
  resizeCanvas(600, 600);
}