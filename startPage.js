let hoverFont = "SpecialElite"
let controlButton;

  function setup() {
    let canvas = createCanvas(windowWidth, windowHeight/2);
    canvas.parent('top');

    textAlign(CENTER, CENTER)


    
  }

  function draw() {
    textSize(30);
    text('IELTS Listening Test', windowWidth/2-20, 50);
    textSize(15);
    text('This is a program help visualize a non-native English speakers mindmap during doing a listening test.', windowWidth/2-20, 90);
    textSize(15);
    text('Welcome to join my journey, and you can view your Answer Key below.', windowWidth/2-20, 110);
    
    controlButton = createButton("Start Test")
    controlButton.style('background-color', 'white');
    controlButton.style('color', 'black');
    controlButton.style("height", "30px");
    controlButton.style("width", "100px");
    controlButton.position(windowWidth/2-35, height/2-20);
    controlButton.mousePressed(() => {
        window.location.href = "pro3.html";  // Replace with your actual HTML file
      });

}

