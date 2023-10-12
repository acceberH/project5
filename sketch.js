let time=0;///Define the time value
let index=1;//Interface value
let balls = [];//storing particles in star trail
let mouse=0;//The factor value of the length of the star trail  particles' speed(slow/fast) depend on this+mouseped
let mousePed=5; //The speed of change of the star trail length factor value
let boxs = [];//array for storing rect
let s;//Line thickness of rectangle
let stars = [];//storing stars
let speed=20;//Star movement speed
let angle=0;//The initial rotation of the star in radians
let loc=0; //The speed and position of the stars (the factor that determines the speed of the stars from slow to fast)
let anglespeed=0.05;//Star rotation speed
let waters = [];//storing water drops


// setup canvas
function setup() {
  const WIDTH = windowWidth;
  const HEIGHT = windowHeight;
  createCanvas(windowWidth, windowHeight);
  //fullScreen();
  rectMode(CENTER);
  //for loop executes 500 times
  for (let i=0; i<500; i++) {
    balls.push(new ball());//Add 500 particles in the star
  }
  //for loop traverses 1200 times
  for (let i=0; i<1200; i++) {
    stars.push(new Star());//Add 1200 stars
  }
}


// draw to canvas per frame
function draw() {
  time++; 
  //if time>2000  set to 0
  if (time>2000) {
    time=0;
  }
  //if time == 0  
  if (time==0) {
    background(0);  //black background
    mouse=0;//set star trail length facter to 0
  }
  if (time==500) {
    background(0); 
    loc=0;//stars moving speed to 0
  }
  //first scene
  if (time<500) {
    noStroke();
    fill(67, 67, 77, 20);
    rect(width/2, height/2, width, height);
    mouse+=mousePed; //The length factor of the star trail increases (the larger the value, the longer the length)
    if (mouse>width||mouse<0) { //judgment value range if it exceeds the set range
      mousePed*=-1; //Reverse change
    }
    //particles in star trail
    for (let i=0; i<balls.length; i++) {
      b = balls[i]; 
      b.move();
    }
  } else if (time>=500&&time<1000) {  //Time within 500 - 1000->change to 2nd scene
    background(0); 
    if (frameCount%50==0) {  
      c=color(0, 250, 0); //green
      s=2; //The thickness of the line is 2
    } else { //pink
      c=color(255, 81, 232);
      s=1; //thickness:1
    }
    if (frameCount%10==0) { 
      //if (boxs.size()<24) { 
      boxs.push(new box(c, s));  //add a rect
      //console.log("new box added!");
      //}
    }
    
    for (let i=0; i<boxs.length; i++) {
      b = boxs[i];
      b.show(); 
      b.move();
    }
  } else if (time>=1000&&time<1500) { //change to 3rd scene
    fill(0, 100); 
    rect(width/2, height/2, width, height);
    loc+=2; //The value of the movement speed factor of the stars increases

    if (loc>width) { //If the speed value exceeds the set range
      loc=0; //The speed factor value returns to 0
    }

    speed=map(loc, 0, width, 5, 30); //The speed is the factor value mapped from 0 - width to the corresponding value in the 5 - 30 interval
    angle+=anglespeed; //Rotation radians + rotation speed
    translate(width/2, height/2); //to the center of the canvas
    
    for (let i=0; i<stars.length; i++) { 
      s = stars[i];
      s.show();
      s.move();
    }
  } else if (time>=1500&&time<2000) {  //last scene
    if (dist(mouseX, mouseY, width/2, 640)<150) {   //If the distance between the coordinate point where the mouse is located and the coordinate point is less than 150
      if (frameCount%30==0) { 
        waters.push(new water()); //add drops
      }
    }
    background(0); 
  
    for (let i=0; i<waters.length; i++) {
      w = waters[i]; //Assign each waterdrops class to w
      w.show();
    }
    //where water comes out
    noFill();
    stroke(255);
    noStroke();
    fill(229, 220, 220);
    rect(width/2, 35, 74, 69, 21);
    fill(163, 148, 148);
    rect(width/2, 0, 410, 91);
    //draw water bottle of waterfountain
    push();
    translate(width/2-45, height/2);
    fill(183, 204, 201);
    stroke(174, 171, 171);
    strokeWeight(2);
    beginShape();
    vertex(0, 0);
    bezierVertex(-63, 47, -40, 155, -40, 317);
    vertex(-40, 317);
    bezierVertex(12, 352, 53, 350, 117, 317);
    vertex(117, 317);
    bezierVertex(119, 175, 146, 37, 82, 0);
    vertex(81, -32);
    bezierVertex(31, -32, 0, -32, 0, -32);
    endShape(CLOSE);
    pop();
  }
}


//star trail
class ball {
  constructor() {
    this.x=width/2;
    this.y=height/2;
    this.theta=radians(random(360));
    this.thetaped=radians(random(0.1, 0.5));
    this.pedget=this.thetaped;
    this.w=random(10, 300);
    this.wget=this.w;
    this.alpha=random(40, 200);
    this.c=color(random(0, 255), random(0, 255), random(0, 255));
  }
  move() {
    noStroke();
    //The length of the star track w is the value of the mouse factor mapped from 0 - width to 0.8 times the initial length of the star track - 1.5 times the initial length of the interval value
    this.w=map(mouse, 0, width, this.wget*0.8, this.wget*1.5);
    fill(this.c, this.alpha);
    ellipse(this.x+cos(this.theta)*this.w, this.y+sin(this.theta)*this.w, 1, 1);//draw particles
    this.theta+=this.thetaped;//particles rotate
  }
}
//rect
class box { 
  constructor(color, speed) {
    this.color = color;
    this.speed = speed;
    this.theta = 45;
    this.x = width / 2;
    this.y = height / 2;
  }
  //draw rect
  show() {
    noFill();
    stroke(this.color);
    push();
    translate(this.x, this.y);//Translate to the left point x y
    rotate(radians(this.theta)); //Rotate theta angle with x y as the center point
    let size=map(this.theta, 45, 0, 50, 800); //The rectangle size is the value of theta, which is mapped from 45-0 to the value in the range of 50-800
    strokeWeight(this.speed);
    rect(0, 0, size, size);
    pop();
  }
  //Rectangle rotate (bigger)
  move() {
    this.theta-=0.2;
  }
}
//
class Star {
  
  constructor() {
    this.x=random(-width, width); 
    this.y=random(-height, height);
    this.z=random(width);
    this.c=color(random(255), random(255), random(255));
  }
  show() {
    let sx=map(this.x/this.z, 0, 1, 0, width); //The x position of the star is the value of x/z mapped from 0 - 1 to 0 - width interval
    let sy=map(this.y/this.z, 0, 1, 0, height); //The y position of the star is the value of y/z mapped from 0-1 to 0-height interval
    let r=map(this.z, 0, width, 16, 0);//The size of the star is the value of z mapped from 0 - width to 16 - 0 interval
    noStroke();
    fill(this.c);
    ellipse(sx, sy, r, r);//draw star
  }
  move() {
    this.z-=speed; 
    if (this.z<1) {  
      this.z=random(width); //if z<1 then refresh
    }
  }
}
//water drops
class water {
  
  constructor() {
    this.x=width/2;
    this.y=10;
    this.alpha=255;
  }
  show() {
    this.alpha=map(this.y, 0, 450, 255, 0); //The transparency of the water drop is the value of y, which is mapped from 0 - 385 to the value in the range of 255 - 0
    noStroke();
    fill(183, 204, 201, this.alpha);//Fill the color and transparency of the water drop
    ellipse(this.x, this.y, 20, 36); ///Draw water drops
    ellipse(this.x, this.y, 30, 46);
    this.y+=2;//The y-axis position of the water drop moves down
  }
}
