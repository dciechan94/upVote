import processing.sound.*;
PImage img;

int nextItem = 0;

// Variables for pixelowa żaba
int millisecondBegin = 0;
float minimizeAfterMSeconds = 1000 * 15;
float endTime = millisecondBegin + minimizeAfterMSeconds;

float ellipseMinimalSize = 3;
float ellipseMaximumSize = 40;
float a = -(ellipseMaximumSize-ellipseMinimalSize)/minimizeAfterMSeconds;
float b = ellipseMaximumSize + ((ellipseMaximumSize-ellipseMinimalSize)*millisecondBegin)/minimizeAfterMSeconds;

float minPointSpeed = 1;
float maxPointSpeed = 600;
float aSpeed = (maxPointSpeed-minPointSpeed)/(minimizeAfterMSeconds);
float bSpeed = maxPointSpeed - (maxPointSpeed-minPointSpeed)*endTime/minimizeAfterMSeconds;

float aColorChange = 1/(minimizeAfterMSeconds);
float bColorChange = -millisecondBegin/minimizeAfterMSeconds;

float aDelay = 0;
float bDelay = 0;
float maxDelay = 0;
float minDelay = 0;


float phaseTranslation = 0;
boolean handledOnce = false;

float v = 1.0 / 9.0;
float[][] kernel = {{ v, v, v }, 
                    { v, v, v }, 
                    { v, v, v }};
                    
SoundFile soundfile1;

Ball[]  balls =  { 
  new Ball(1920/2, 1200/2, 160, 13), 
  new Ball(1920/2,1200/2, 160, 10), 
  new Ball(1920/2, 1200/2, 160, 15), 
    new Ball(1920/2, 1200/2,160, 13), 
  new Ball(1920/2, 1200/2, 160, 10), 
  new Ball(1920/2, 1200/2, 160, 15), 
    new Ball(1920/2, 1200/2, 160, 13), 
  new Ball(1920/2, 1200/2, 160, 10), 
  new Ball(1920/2, 1200/2, 160, 15), 
  new Ball(1920/2, 1200/2, 160, 18) 
};

Ball[]  balls2 =  { 
  new Ball(1920/2, 1200/2, 200, 20), 
  new Ball(1920/2,1200/2,200, 25), 
   new Ball(1920/2,1200/2,200, 30), 
    new Ball(1920/2,1200/2,200, 25), 
       new Ball(1920/2,1200/2,200, 30), 
    new Ball(1920/2,1200/2,200, 25), 
        new Ball(1920/2,1200/2,200, 25), 
       new Ball(1920/2,1200/2,200, 30), 
    new Ball(1920/2,1200/2,200, 25), 
        new Ball(1920/2,1200/2,200, 25), 
       new Ball(1920/2,1200/2,200, 30), 
    new Ball(1920/2,1200/2,200, 25), 
     new Ball(1920/2,1200/2,200, 20)

};

Ball[]  balls3 =  { 
  new Ball(1920/2, 1200/2, 200, 20), 
  new Ball(1920/2,1200/2,200, 25), 
   new Ball(1920/2,1200/2,200, 30), 
    new Ball(1920/2,1200/2,200, 25), 
       new Ball(1920/2,1200/2,200, 30), 
    new Ball(1920/2,1200/2,200, 25), 
        new Ball(1920/2,1200/2,200, 25), 
       new Ball(1920/2,1200/2,200, 30), 
    new Ball(1920/2,1200/2,200, 25), 
        new Ball(1920/2,1200/2,200, 25), 
       new Ball(1920/2,1200/2,200, 30), 
    new Ball(1920/2,1200/2,200, 25), 
     new Ball(1920/2,1200/2,200, 20)

};

class Ball {
  PVector position;
  PVector velocity;

  float radius, m;

  Ball(float x, float y, float r_, float vel) {
    position = new PVector(x, y);
    velocity = PVector.random2D();
    velocity.mult(vel);
    radius = r_;
    m = radius*.1;
  }

  void update() {
    position.add(velocity);
  }

  void checkBoundaryCollision() {
    if (position.x > width-radius) {
      position.x = width-radius;
      velocity.x *= -1;
    } else if (position.x < radius) {
      position.x = radius;
      velocity.x *= -1;
    } else if (position.y > height-radius) {
      position.y = height-radius;
      velocity.y *= -1;
    } else if (position.y < radius) {
      position.y = radius;
      velocity.y *= -1;
    }
  }

  void checkCollision(Ball other) {

    // Get distances between the balls components
    PVector distanceVect = PVector.sub(other.position, position);

    // Calculate magnitude of the vector separating the balls
    float distanceVectMag = distanceVect.mag();

    // Minimum distance before they are touching
    float minDistance = radius + other.radius;

    if (distanceVectMag < minDistance) {
      float distanceCorrection = (minDistance-distanceVectMag)/2.0;
      PVector d = distanceVect.copy();
      PVector correctionVector = d.normalize().mult(distanceCorrection);
      other.position.add(correctionVector);
      position.sub(correctionVector);

      // get angle of distanceVect
      float theta  = distanceVect.heading();
      // precalculate trig values
      float sine = sin(theta);
      float cosine = cos(theta);

      /* bTemp will hold rotated ball positions. You 
       just need to worry about bTemp[1] position*/
      PVector[] bTemp = {
        new PVector(), new PVector()
      };

      /* this ball's position is relative to the other
       so you can use the vector between them (bVect) as the 
       reference point in the rotation expressions.
       bTemp[0].position.x and bTemp[0].position.y will initialize
       automatically to 0.0, which is what you want
       since b[1] will rotate around b[0] */
      bTemp[1].x  = cosine * distanceVect.x + sine * distanceVect.y;
      bTemp[1].y  = cosine * distanceVect.y - sine * distanceVect.x;

      // rotate Temporary velocities
      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

      /* Now that velocities are rotated, you can use 1D
       conservation of momentum equations to calculate 
       the final velocity along the x-axis. */
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      // final rotated velocity for b[0]
      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      // final rotated velocity for b[0]
      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      // hack to avoid clumping
      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

      /* Rotate ball positions and velocities back
       Reverse signs in trig expressions to rotate 
       in the opposite direction */
      // rotate balls
      PVector[] bFinal = { 
        new PVector(), new PVector()
      };

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      // update balls to screen position
      other.position.x = position.x + bFinal[1].x;
      other.position.y = position.y + bFinal[1].y;

      position.add(bFinal[0]);

      // update velocities
      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }
  
   void display() {
    noStroke();
    fill(204);
    ellipse(position.x, position.y, radius*2, radius*2);
  }
}

void setup() {
  //fullScreen();
    size(1920, 1200);
    frameRate(50);
    img = loadImage("galaxy.jpg");
    img.loadPixels();
    loadPixels();
    
    soundfile1 = new SoundFile(this, "TheFlowerDuet.mp3");
    soundfile1.loop(); 
}

void mouseClicked() {
    nextItem += 1;
  
    if(nextItem == 1) {
        img = loadImage("2.jpg");
        img.resize(1920,1200);
        img.loadPixels();
        loadPixels();
        background(0);
        
        //soundfile1.stop();
        //soundfile1 = new SoundFile(this, "BachGMinor.mp3");
        //soundfile1.loop();
        
        millisecondBegin = millis();
        minimizeAfterMSeconds = 1000 * 15;
        endTime = millisecondBegin + minimizeAfterMSeconds;
        
        ellipseMinimalSize = 3;
        ellipseMaximumSize = 40;
        a = -(ellipseMaximumSize-ellipseMinimalSize)/minimizeAfterMSeconds;
        b = ellipseMaximumSize + ((ellipseMaximumSize-ellipseMinimalSize)*millisecondBegin)/minimizeAfterMSeconds;

        minPointSpeed = 1;
        maxPointSpeed = 600;
        aSpeed = (maxPointSpeed-minPointSpeed)/(minimizeAfterMSeconds);
        bSpeed = maxPointSpeed - (maxPointSpeed-minPointSpeed)*endTime/minimizeAfterMSeconds;

        aColorChange = 1/(minimizeAfterMSeconds);
        bColorChange = -millisecondBegin/minimizeAfterMSeconds;

    }
  
   if(nextItem == 2) {
        img = loadImage("4c.jpg");
        img.resize(1920,1200);
        img.loadPixels();
        loadPixels();
        
        //soundfile1.stop();
        //soundfile1 = new SoundFile(this, "ocean5.mp3");
        //soundfile1.loop();
        
        millisecondBegin = millis();
        
        minimizeAfterMSeconds = 1000 * 15;
        endTime = millisecondBegin + minimizeAfterMSeconds;
       
        aColorChange = 1/(minimizeAfterMSeconds);
        bColorChange = -millisecondBegin/minimizeAfterMSeconds;
    }
    
    if(nextItem == 3) {   
        millisecondBegin = millis();
        
        minimizeAfterMSeconds = 1000 * 15;
        endTime = millisecondBegin + minimizeAfterMSeconds;
       
        aColorChange = 1/(minimizeAfterMSeconds);
        bColorChange = -millisecondBegin/minimizeAfterMSeconds;
        
    }
  
    if(nextItem == 4) {
        img = loadImage("5.jpg");
        img.resize(1920,1200);
        img.loadPixels();
        loadPixels();
        
        //soundfile1.stop();
        //soundfile1 = new SoundFile(this, "relaks.mp3");
        //soundfile1.loop();
    }
 
    if(nextItem == 5) {
        img = loadImage("8.jpg");
        img.resize(1920,1200);
        img.loadPixels();
        loadPixels();
        
        //soundfile1.stop();
        //soundfile1 = new SoundFile(this, "woodkid.mp3");
        //soundfile1.loop();
        
        millisecondBegin = millis();
        
        minimizeAfterMSeconds = 1000 * 15;
        endTime = millisecondBegin + minimizeAfterMSeconds;
        
        maxDelay = 600;
        minDelay = 60;
        aDelay = -(maxDelay-minDelay)/minimizeAfterMSeconds;
        bDelay = maxDelay + (maxDelay-minDelay)*millisecondBegin/minimizeAfterMSeconds;
    }
    
    /*if(nextItem == 6) {
        img = loadImage("4c.jpg");
        img.resize(1920,1200);
        img.loadPixels();
        loadPixels();
        
        soundfile1.stop();
        soundfile1 = new SoundFile(this, "woodkid.mp3");
        soundfile1.loop();
        
        millisecondBegin = millis();
        
        minimizeAfterMSeconds = 1000 * 15;
        endTime = millisecondBegin + minimizeAfterMSeconds;
       
        aColorChange = 1/(minimizeAfterMSeconds);
        bColorChange = -millisecondBegin/minimizeAfterMSeconds;
    }*/
    

    
    if(nextItem == 6) {
        exit();
    }
}

void draw() {
    if(nextItem == 0) {
        for (Ball b : balls) {
            b.update();
            b.checkBoundaryCollision();
        }
        
        for (int x = 0; x < width; x++) {
            for (int y =  0; y < height; y++ ) {
      
                // Calculate the 1D location from a 2D grid
                int loc = x + y*img.width;
                // Get the R,G,B values from image
                float r;
                r = red (img.pixels[loc]); //+ red(pixels[y*width + x]);
                
                // Calculate an amount to change brightness based on proximity to the mouse
                float maxdist = 180;//dist(0,0,width,height);
                //float d = 10;//dist(x, y, mouseX, mouseY);
        
                float d = dist(x,y, mouseX, mouseY);
         
                float adjustbrightness = 255*(maxdist-d)/maxdist;
                r += adjustbrightness;
                //r = (r + red (img.pixels[loc]));
                //g += adjustbrightness;
                //b += adjustbrightness;
                // Constrain RGB to make sure they are within 0-255 color range
                r = constrain(r, 0, 255);
                //g = constrain(g, 0, 255);
                //b = constrain(b, 0, 255);
                // Make a new color and set pixel in the window
                //color c = color(r, g, b);
                color c = color(r);
                pixels[y*width + x] = c;
            }
        }
        updatePixels();
  
        for (Ball ba : balls) {
            for (int x = int(ba.position.x - ba.radius); x < ba.position.x + ba.radius; x++) {
                for (int y =  int(ba.position.y - ba.radius); y <  ba.position.y + ba.radius; y++ ) {
      
                    // Calculate the 1D location from a 2D grid
                    int loc = x + y*img.width;
                    // Get the R,G,B values from image
                    float r;
                    r = red (img.pixels[loc]);// +red(pixels[y*width + x]);
                    //g =  green (img.pixels[loc]) + green(pixels[y*width + x]);
                    //b =  blue (img.pixels[loc]) + blue(pixels[y*width + x]);
                    //for (Ball ba : balls) {
        
                    //g = green (img.pixels[loc]);
                    //b = blue (img.pixels[loc]);
                    // Calculate an amount to change brightness based on proximity to the mouse
                    float maxdist = ba.radius/2;//dist(0,0,width,height);
                    //float d = 10;//dist(x, y, mouseX, mouseY);
        
                    float d = dist(x,y, ba.position.x, ba.position.y);
         
                    float adjustbrightness = 255*(maxdist-d)/maxdist;
                    r += adjustbrightness;
                    //r = (r + red (pixels[y*width + x]));
                    //g += adjustbrightness;
                    //b += adjustbrightness;
                    // Constrain RGB to make sure they are within 0-255 color range
                    r = constrain(r, 0, 255);
                    r += red(pixels[y*width + x]);
                    r = constrain(r, 0, 255);
                    //g = constrain(g, 0, 255);
                    //b = constrain(b, 0, 255);
                    // Make a new color and set pixel in the window
                    //color c = color(r, g, b);
                    color c = color(r);
                    pixels[y*width + x] = c;//color((c +pixels[y*width + x])/2);
                }
            }
            updatePixels();
        }
    }
    
    if(nextItem == 1) {        
        int speed = (int)(aSpeed*millis() + bSpeed);
        float colorRatio = aColorChange*millis() + bColorChange;
        
        for(int i = 0; i <speed; i++) {
            
            float x = random(width);
            float y = random(height);
            
            float ellipseDelta = ellipseMinimalSize;
            if(millis() <= endTime) {
                ellipseDelta = a * millis() + b;
            }

            int ellipseSize = (int)ellipseDelta;//(int)(ellipseMinimalSize + ellipseDelta);
            color c = img.get((int)x,(int)y);
            
            
            int grayPixel = int(red(c) + green(c) + blue(c) / 3);
            color gray = color(grayPixel,grayPixel,grayPixel);
            
            //float rBlend,gBlend,bBlend;
            
            color blenda = lerpColor(gray,c, colorRatio);
            //blenda = constrain((int)(red(c)+red(gray)), (int)(green(c)+green(gray)), (int)(blue(c)+ blue(gray)));
            //color c = img.get((int)x,(int)y);
            fill(blenda);
            ellipse(x,y,ellipseSize,ellipseSize);
        }
        //delay(50);
    }
    
    
    if(nextItem == 2) {
        
        int randomDir = floor(random(2));
        int lineCount = floor(random(50));
        
        if(randomDir == 0) {
            int[] columns = new int[lineCount];
            for (int i = 0; i< columns.length; i++) {
                columns[i] = floor(random(width));
            }
            for(int actualY = 0; actualY < height; actualY++) {
                for (int i = 0; i< columns.length; i++) {
                    pixels[(actualY)*width + columns[i]] = img.get(columns[i], actualY);
                }
                
            }
            updatePixels();
        }
        
        if(randomDir == 1) {
            int[] rows = new int[lineCount];
            for (int i = 0; i< rows.length; i++) {
                rows[i] = floor(random(height));
            }
            for(int actualX = 0; actualX < width; actualX++) {
                for (int i = 0; i< rows.length; i++) {
                    pixels[(rows[i])*width + actualX] = img.get(actualX, rows[i]);
                }
                
            }
            updatePixels();
        }
        
        if(millis() - millisecondBegin > 1000*10) {
            mouseClicked();
        }
    }
    
    if(nextItem == 3) {
        float parts = 150;
        float sinePeriods = 4;
        float maxYpx = 5;
        int partSize = floor(width/parts);
        float colorRatio = aColorChange*millis() + bColorChange;
        
        phaseTranslation += sinePeriods*TWO_PI/parts;
        for(int actualX = 0; actualX <width; actualX = actualX + partSize) {
            int deltaH = floor(sin(actualX*sinePeriods*TWO_PI/width - phaseTranslation)*maxYpx);
            
            for(int pixelX = actualX; pixelX < actualX+partSize;pixelX++) {
                for(int pixelY = 0; pixelY < height; pixelY++) {
                    if(pixelY + deltaH <0) {
                        color c = color(255,255,255);
                        //println("X= " + pixelX);
                   // println("Y= " + pixelY + " toY= " + (pixelY+deltaH));
                   // println("H= " + deltaH + " so turn black= " + (height + pixelY+deltaH));
                        
                        pixels[( height + pixelY+deltaH)*width + pixelX] = c;
                        //if(pixelY 
                        //fill(c);
                        //println("Skip1");
                        continue;
                    }
                    if(pixelY + deltaH >= height) {
                        color c = color(255,255,255);
                        pixels[((pixelY+ deltaH) % height)*width + pixelX] = c;
                       
                        //println("Skip2");
                        continue;
                    }
                    
                    color c = img.get(pixelX,pixelY);
                  
                    int grayPixel = int(red(c) + green(c) + blue(c) / 3);
                    color gray = color(grayPixel,grayPixel,grayPixel);
                    
                    //float rBlend,gBlend,bBlend;
                    
                    color blenda = lerpColor(c,gray, colorRatio);
                    
                    
                    fill(blenda);
                    //println("X= " + pixelX);
                    //println("Y= " + pixelY + " toY= " + (pixelY+deltaH));
                    //println("H= " + deltaH);
                    pixels[(pixelY+deltaH)*width + pixelX] = blenda;
                }
            }
        }
        updatePixels();
        //delay(20);
    }
         
    if(nextItem == 4) {
        for (Ball b : balls2) {
            b.update();
            b.checkBoundaryCollision();
        }
        
        for (int x = 0; x < width; x++) {
            for (int y =  0; y < height; y++ ) {
                
                // Calculate the 1D location from a 2D grid
                int loc = x + y*img.width;
                int grayPixel = int(red(img.pixels[loc]) + green(img.pixels[loc]) + blue(img.pixels[loc]) / 3);
                color gray = color(grayPixel,grayPixel,grayPixel);
        
                pixels[y*width + x] =gray;
            }
        }
        updatePixels();
        
        float maxdist = 300;
        for (int x = int(max(0,mouseX-maxdist)); x < int(min(1920,mouseX+maxdist)); x++) {
            for (int y =  int(max(0,mouseY-maxdist)); y < int(min(1200,mouseY+maxdist)); y++ ) {
                int loc = x + y*img.width;
                // Get the R,G,B values from image
                float r,g,b;
                r = red (img.pixels[loc]);
                g =  green (img.pixels[loc]);
                b =  blue (img.pixels[loc]);
    
                float d = dist(x,y, mouseX, mouseY);
             
                float adjustbrightness = 255*(max(0,maxdist-d))/maxdist;
                r = r*(adjustbrightness)/255 + (red(pixels[loc])*255*(255-adjustbrightness))/(255*255);// ;*(1-adjustbrightness);
                g = g*(adjustbrightness)/255 + (green(pixels[loc])*255*(255-adjustbrightness))/(255*255);
                b = b*(adjustbrightness)/255 + (blue(pixels[loc])*255*(255-adjustbrightness))/(255*255);
    
                r = constrain(r, 0, 255);
                g = constrain(g, 0, 255);
                b = constrain(b, 0, 255);
            
                color c = color(r,g,b);
          
                pixels[y*width + x] = c;
            }
        }
        updatePixels();
      
        for (Ball ba : balls2) {
            for (int x = max(0,int(ba.position.x - ba.radius)); x < min(ba.position.x + ba.radius, 1920); x++) {
                for (int y =  max(0,int(ba.position.y - ba.radius)); y <  min(ba.position.y + ba.radius, 1200); y++ ) {
          
                    // Calculate the 1D location from a 2D grid
                    int loc = x + y*img.width;
                    // Get the R,G,B values from image
                    float r,g,b;
                    r = red (img.pixels[loc]);
                    g =  green (img.pixels[loc]);
                    b =  blue (img.pixels[loc]);
          
                    maxdist = ba.radius;
    
                    float d = dist(x,y, ba.position.x, ba.position.y);
             
                    float adjustbrightness = 255*(max(0,maxdist-d))/maxdist;
                    r = r*(adjustbrightness)/255 + (red(pixels[loc])*255*(255-adjustbrightness))/(255*255);
                    g = g*(adjustbrightness)/255 + (green(pixels[loc])*255*(255-adjustbrightness))/(255*255);
                    b = b*(adjustbrightness)/255 + (blue(pixels[loc])*255*(255-adjustbrightness))/(255*255);
            
                    r = constrain(r, 0, 255);
                    g = constrain(g, 0, 255);
                    b = constrain(b, 0, 255);
            
                    color c = color(r,g,b);
                    pixels[y*width + x] = c;
                }
            }
            updatePixels();
        }
    }


    if(nextItem == 5) {
        float parts = 80;
        float sinePeriods = 20;
        float maxYpx = 20;
        int partSize = floor(width/parts);
        int delayValue = (int)minDelay;
        
        if(millis() <= endTime) {
            delayValue = floor(aDelay * millis() + bDelay);
        }
        
        
        phaseTranslation += sinePeriods*TWO_PI/parts;
        for(int actualX = 0; actualX <width; actualX = actualX + partSize) {
            int deltaH = floor(sin(actualX*sinePeriods*TWO_PI/width - phaseTranslation)*maxYpx);
            
            for(int pixelX = actualX; pixelX < actualX+partSize;pixelX++) {
                for(int pixelY = 0; pixelY < height; pixelY++) {
                    if(pixelY + deltaH <0) {
                        color c = color(255,255,255);
                        //println("X= " + pixelX);
                   // println("Y= " + pixelY + " toY= " + (pixelY+deltaH));
                   // println("H= " + deltaH + " so turn black= " + (height + pixelY+deltaH));
                        
                        pixels[( height + pixelY+deltaH)*width + pixelX] = c;
                        //if(pixelY 
                        //fill(c);
                        //println("Skip1");
                        continue;
                    }
                    if(pixelY + deltaH >= height) {
                        color c = color(255,255,255);
                        pixels[((pixelY+ deltaH) % height)*width + pixelX] = c;
                       
                        //println("Skip2");
                        continue;
                    }
                    
                    color c = img.get(pixelX,pixelY);
                  
                    int grayPixel = int(red(c) + green(c) + blue(c) / 3);
                    color gray = color(grayPixel,grayPixel,grayPixel);
                    
                    //float rBlend,gBlend,bBlend;
                    
                    color blenda = lerpColor(c,gray, 0.5);
                    
                    
                    fill(blenda);
                    //println("X= " + pixelX);
                    //println("Y= " + pixelY + " toY= " + (pixelY+deltaH));
                    //println("H= " + deltaH);
                    pixels[(pixelY+deltaH)*width + pixelX] = blenda;
                }
            }
        }
        updatePixels();
        //delay(delayValue);
    }
    
    /*if(nextItem == 6) {
        int randomDir = floor(random(2));
        int lineCount = floor(random(50));
        
        if(randomDir == 0) {
            int[] columns = new int[lineCount];
            for (int i = 0; i< columns.length; i++) {
                columns[i] = floor(random(width));
            }
            for(int actualY = 0; actualY < height; actualY++) {
                for (int i = 0; i< columns.length; i++) {
                    pixels[(actualY)*width + columns[i]] = img.get(columns[i], actualY);
                }
                
            }
            updatePixels();
        }
        
        if(randomDir == 1) {
            int[] rows = new int[lineCount];
            for (int i = 0; i< rows.length; i++) {
                rows[i] = floor(random(height));
            }
            for(int actualX = 0; actualX < width; actualX++) {
                for (int i = 0; i< rows.length; i++) {
                    pixels[(rows[i])*width + actualX] = img.get(actualX, rows[i]);
                }
                
            }
            updatePixels();
        }
    }*/
    
    
    
}