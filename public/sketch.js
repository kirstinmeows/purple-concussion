//Created by Kirstin Marshall ／人◕ ‿‿ ◕人＼
//See my blog ==> https://kirstinmeows-coding-blog.deno.dev/
//References: co_dart, thecodingtrain & ProfessorChris on YouTube 

let x,y,d
let starC

function setup() 
{
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB);
  starC = color(261,80,80,1);
}

function draw() 
{
  background(8);
  noStroke(); 
  fill(starC);
  drawStars();
}


 function drawStars()
{
//Iiteration of stars in a 16 x 9 grid, with additional padding to ensure stars appear offscreen
   for (y = -100; y < (windowHeight +300); y += (windowHeight +100) / 9){ for (x = -100; x < (windowWidth +300); x += (windowWidth +100) / 16)
   {
       pointedStar(x, y, 5, 20, 10)
// calculates the distance between mouseX and mouseY, to the centre of each star     
       d = dist(mouseX,mouseY,x,y);
       
// Draws stars following the mouse movement from the previous frame, called by using 'movedX' and 'movedY'. Lerp is used to move the stars between the two points at a visually smooth rate by using deltaTime.  DeltaTime is divided by 80 to make the movement less harsh.   
       if (d <=200 & mouseIsPressed == false)
      {
        pointedStar((lerp(x,x+movedX,deltaTime/80)), lerp(y,y+movedY,deltaTime/80), 5, 25, 12.5); 
        
             fill(colourShift())
      }

// When mouse is pressed, stars within 180px distance of the mouse given new sizes through changing the outer and inner radius'.  Using map to allow for the change in size to range from bigger to smaller depending on the distance from the mouse.
       else if (d<=180 & mouseIsPressed == true)
      {
         let newOuter = map(d,0,180,70,5);
         let newInner = map(d,0,180,35,2.5);
         pointedStar(x,y,5,newOuter, newInner) 
         fill(261,100,90);
      }

//Any stars outside of the radius stay uneffected by the colourshift function
       else 
      {
        fill(starC);
      }
       
    }
  }
}

// Function to create the star shape. (x coordinate of centre, y coordinate of centre, radius of whole star, radius of the inner points)
  function pointedStar (x,y, n, outerRadius, innerRadius)
  {
  // Divide TAU by 'n' number of points, to create 'n' equal angles.  'n' refers to the number of points on the star.
    let theta = TAU / n; 

    beginShape() 

// Iterates through the points multipled by i, to create 5 inner points and 5 outer points.
      for (let i = 0; i < n; i++)
    {
    // outer points
      vertex (x + cos(i * theta)* outerRadius, y + sin(i * theta) *outerRadius);
      
    // inner points, addition of 0.5 to have the points fall midway between the outer points.
      vertex (x + cos((i + 0.5) * theta)* innerRadius, y + sin((i +0.5)* theta)*innerRadius);
      
    }

    endShape(CLOSE);

}

// Creates a shift in saturation and alpha depending on the distance from the mouse as determined above and represnted by 'd'.  Returns the colour to the fill called when the stars are within various radius'.
function colourShift()
{
  const h = 261;
  let s = map(d,0,300,100,70);
  const b = 80;
  const a = map(d,0,200,0.8,0.5);
  
  return color(h,s,b,a)
}

