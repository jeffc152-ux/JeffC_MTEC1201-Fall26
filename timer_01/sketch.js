/* 
Creates simple timers that trigger one time only.

millis() tracks total milliseconds since sketch started.
1000 milliseconds = 1 second.

- Background begins as grey.
- Changes to blue after 2 seconds.
- Changes to red after 8 seconds.
*/

let currentTime = 0; // variable to track millis() clock
let timer1 = 2000; // variable for a 2 second timer
let timer2 = 8000; // 8 second timer

function setup() 
{
  createCanvas(700, 700);
  background(127); // grey background
  textAlign(CENTER); //draws text from centerpoint
  textSize(64); //sets size of text
}

function draw() 
{
  currentTime = millis(); //continuously update our currentTime variable

  if (currentTime > timer2) //if 8 second timer has triggered...
  {
    background(255, 0, 0); //red background
    text("2", width / 2, height / 2); //display "2" for 8 second timer
  } 
	else if (currentTime > timer1) //if 2 second timer has triggered...
  {
    background(0, 0, 255);  //blue background
    text("1", width / 2, height / 2); //display "1" for 2 second timer
  }
  else  //if neither timer has passed...
  {
    background(127); //grey background
    text("0", width / 2, height / 2); //display "0" before any timer has triggered
  }
	
  text("currentTime = " + int(currentTime), width / 2, height/4);
}