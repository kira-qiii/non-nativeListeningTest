let speechRec;  
let isListening = false;  
let outputDiv; // Container for all recognized sentences
let mic;
let micStarted = false;  // Flag to track mic state
let messages = [];
let alphas = [];
let font;
let controlButton;
let exportButton;
let bgImage;
let testAudio;
let highlight1A = ["prevent", "preventing","invaders","enter", "entering"]
let highlight1B = ["psychological", "barrier","function"]
let highlight1C = ["country", "enduring","strength","show"]
let highlight2A = ["third", "3rd","BC.","century"]
let highlight2B = ["220", "BC."]
let highlight2C = ["390", "AD."]
let highlight3A = ["great wall", "great"]
let highlight3B = ["big wall", "big"]
let highlight3C = ["long wall", "long"]
let highlight4A = ["Chin", "Chin dynasty","Chin."]
let highlight4B = ["northern wei dynasty", "northern wei"]
let highlight4C = ["ming", "ming dynasty"]
let highlight5A = ["military", "fortification"]
let highlight5B = ["protect", "caravans", "trade", "routes"]
let highlight5C = ["contribute", "defense"]
let highlightBut = ["but","Although","However","though"]
let highlightReason = ["So","Result","lead to","because"]
let word1ACounts = {};
let word1BCounts = {};
let word1CCounts = {};
let word2ACounts = {};
let word2BCounts = {};
let word2CCounts = {};
let word3ACounts = {};
let word3BCounts = {};
let word3CCounts = {};
let word4ACounts = {};
let word4BCounts = {};
let word4CCounts = {};
let word5ACounts = {};
let word5BCounts = {};
let word5CCounts = {};


function preload() {
    font = loadFont('SpecialElite.ttf');
    bgImage = loadImage('/P2/Project2/images/note.jfif'); 
    testAudio = loadSound('/P2/Project2/resources/audio.mp3');
  }

function setup() {
    let canvas = createCanvas(windowWidth*0.6-40, windowHeight-50);
    canvas.parent('right');
    bgImage.resize(windowWidth, height);
    textSize(16);
    textFont(font);
    textAlign(LEFT, TOP);

    // Set up mic input to detect volume
    mic = new p5.AudioIn();
    mic.start();

    speechRec = new p5.SpeechRec();
    speechRec.onResult = showResult;
    speechRec.continuous = true;

  controlButton = createButton("Start")
    controlButton.style('background-color', 'white');
    controlButton.style('color', 'black');
    controlButton.position(20, height+25);
    controlButton.mousePressed(toggleRecognition);  // Attach button to toggle function


  exportButton = createButton("Export")
    exportButton.position(windowWidth-80, height+25);
    exportButton.style('background-color', 'white');
    exportButton.mousePressed(saveMyCanvas);
}
function saveMyCanvas() {
    saveCanvas('myNote', 'png'); 
  }


function toggleRecognition() {
    // Toggle between starting and stopping recognition based on current state
    if (isListening) {
        stopRecognition();
        testAudio.pause();
        controlButton.html("Start");
        controlButton.style('background-color', 'white');
        controlButton.style('color', 'black');
    } else {
        startRecognition();
        testAudio.play();
        controlButton.html("Stop");
        controlButton.style('background-color', 'black');
        controlButton.style('color', 'white');
    }
}

function startRecognition() {
    if (!micStarted) {
        // Start the microphone if not already started
        mic = new p5.AudioIn();
        mic.start();
        micStarted = true;
        console.log("Microphone started");
    }

    speechRec.start(); 
    console.log("Speech recognition started...");
    isListening = true;
}

function stopRecognition() {
    speechRec.stop();  // Stop listening for speech
    console.log("Speech recognition stopped.");
    isListening = false;

    // Stop mic input as well
    mic.stop();
    console.log("Microphone stopped.");
}


function showResult() {
    if (speechRec.resultValue) {
        console.log(speechRec.resultString);


        let vol = mic.getLevel();
        console.log("Mic volume:", vol);

        // Map volume to alpha (transparency)
        let alpha = map(vol*2, 0.001, 0.1, 50, 255); // Lower volume = more transparent
        alpha = constrain(alpha, 50, 255);    // Keep it within range
        console.log("Alpha (transparency):", alpha);
        messages.push(speechRec.resultString);
        alphas.push(alpha);
    }
}



function draw() {
    background(bgImage);
    let y = 30;
    for (let i = 0; i < messages.length; i++) {
        let a = alphas[i] || 255;
        fill(51, 51, 51, a);
        textWrap(WORD);
        let boxWidth = width - 20;
        let words = messages[i].split(' ');
        let x = 20;
        let lineY = y;
        let lineHeight = textAscent() + textDescent();
        for (let j = 0; j < words.length; j++) {
            let word = words[j];
            let wordWidth = textWidth(word + ' ');

            if (x + wordWidth > width - 20) {
                x = 20;
                lineY += lineHeight;
            }

            if (highlightBut.includes(word.toLowerCase())) {
                fill(255, 230, 50,);
                circle(x + wordWidth / 2, lineY + lineHeight / 2, 20); 
                fill(51, 51, 51, a);
                noStroke();
            }

            if (highlightReason.includes(word.toLowerCase())) {
                fill(180, 255, 255,);
                circle(x + wordWidth / 2, lineY + lineHeight / 2, 20); 
                fill(51, 51, 51, a);
                noStroke();
            }

            if (highlight1A.includes(word.toLowerCase())) {
                if (word1ACounts[word.toLowerCase()]) {
                    word1ACounts[word.toLowerCase()]++;
                } else {
                    word1ACounts[word.toLowerCase()] = 1;
                } 
                let count1A = word1ACounts[word.toLowerCase()] || 0;push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2,);
                fill(10, 100, 255,);
                rotate(count1A);
                star(0, 0, 5, 15, 6); 
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight1B.includes(word.toLowerCase())) {
                if (word1BCounts[word.toLowerCase()]) {
                    word1BCounts[word.toLowerCase()]++;
                } else {
                    word1BCounts[word.toLowerCase()] = 1;
                } 
                let count1B = word1BCounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2,);
                fill(100, 255, 10,); 
                rotate(count1B);
                star(0, 0, 5, 15, 6); 
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight1C.includes(word.toLowerCase())) {
                if (word1CCounts[word.toLowerCase()]) {
                    word1CCounts[word.toLowerCase()]++;
                } else {
                    word1CCounts[word.toLowerCase()] = 1;
                } 
                let count1C = word1CCounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(255, 10, 100,); 
                rotate(count1C);
                noStroke();
                star(0, 0, 5, 15, 6);  
                fill(51, 51, 51, a);
                pop();
            }

            if (highlight2A.includes(word.toLowerCase())) {
                if (word2ACounts[word.toLowerCase()]) {
                    word2ACounts[word.toLowerCase()]++;
                } else {
                    word2ACounts[word.toLowerCase()] = 1;
                } 
                let count2A = word2ACounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(10, 100, 255,); // blue highlight
                rotate(count2A);
                noStroke();
                star(0,0, 6, 15, 7); 
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight2B.includes(word.toLowerCase())) {
                if (word2BCounts[word.toLowerCase()]) {
                    word2BCounts[word.toLowerCase()]++;
                } else {
                    word2BCounts[word.toLowerCase()] = 1;
                } 
                let count2B = word2BCounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(100, 255, 10,); // blue highlight
                rotate(count2B);
                star(0,0, 6, 15, 7); 
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight2C.includes(word.toLowerCase())) {
                if (word2CCounts[word.toLowerCase()]) {
                    word2CCounts[word.toLowerCase()]++;
                } else {
                    word2CCounts[word.toLowerCase()] = 1;
                } 
                let count2C = word2CCounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(255, 10, 100,); // blue highlight
                rotate(count2C);
                star(0,0, 6, 15, 7); 
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight3A.includes(word.toLowerCase())) {
                if (word3ACounts[word.toLowerCase()]) {
                    word3ACounts[word.toLowerCase()]++;
                } else {
                    word3ACounts[word.toLowerCase()] = 1;
                } 
                let count3A = word3ACounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(10, 100, 255,); 
                rotate(count3A);
                star(0, 0, 6, 15, 8); 
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight3B.includes(word.toLowerCase())) {
                if (word3BCounts[word.toLowerCase()]) {
                    word3BCounts[word.toLowerCase()]++;
                } else {
                    word3BCounts[word.toLowerCase()] = 1;
                } 
                let count3B = word3BCounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(100, 255, 10,); 
                rotate(count3B);
                star(0, 0, 6, 15, 8); 
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight3C.includes(word.toLowerCase())) {
                if (word3CCounts[word.toLowerCase()]) {
                    word3CCounts[word.toLowerCase()]++;
                } else {
                    word3CCounts[word.toLowerCase()] = 1;
                } 
                let count3C = word3CCounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(255, 10, 100,); // blue highlight
                rotate(count3C);
                star(0, 0, 6, 15, 8); 
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight4A.includes(word.toLowerCase())) {
                if (word4ACounts[word.toLowerCase()]) {
                    word4ACounts[word.toLowerCase()]++;
                } else {
                    word4ACounts[word.toLowerCase()] = 1;
                } 
                let count4A = word4ACounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(10, 100, 255,); // blue highlight
                star(0, 0, 6, 15, 8); 
                rotate(count4A);
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight4B.includes(word.toLowerCase())) { 
                if (word4ACounts[word.toLowerCase()]) {
                    word4ACounts[word.toLowerCase()]++;
                } else {
                    word4ACounts[word.toLowerCase()] = 1;
                } 
                let count4A = word4ACounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(100, 255, 10,); // blue highlight
                star(0,0, 6, 15, 9); 
                rotate(count4B);
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight4C.includes(word.toLowerCase())) {
                if (word4CCounts[word.toLowerCase()]) {
                    word4CCounts[word.toLowerCase()]++;
                } else {
                    word4CCounts[word.toLowerCase()] = 1;
                } 
                let count4C = word4CCounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(255, 10, 100,); // blue highlight
                star(0, 0, 6, 15, 9); 
                rotate(count4C)
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight5A.includes(word.toLowerCase())) {
                if (word5ACounts[word.toLowerCase()]) {
                    word5ACounts[word.toLowerCase()]++;
                } else {
                    word5ACounts[word.toLowerCase()] = 1;
                } 
                let count5A = word5ACounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(10, 100, 255,); // blue highlight
                star(0, 0, 6, 15, 9); 
                rotate(count5A)
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight5B.includes(word.toLowerCase())) {
                if (word5BCounts[word.toLowerCase()]) {
                    word5BCounts[word.toLowerCase()]++;
                } else {
                    word5BCounts[word.toLowerCase()] = 1;
                } 
                let count5B = word5BCounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(100, 255, 10,); // blue highlight
                star(0, 0, 6, 15, 10); 
                rotate(count5B)
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }

            if (highlight5C.includes(word.toLowerCase())) {
                if (word5CCounts[word.toLowerCase()]) {
                    word5CCounts[word.toLowerCase()]++;
                } else {
                    word5CCounts[word.toLowerCase()] = 1;
                } 
                let count5C = word5CCounts[word.toLowerCase()] || 0;
                push();
                translate(x + wordWidth / 2, lineY + lineHeight / 2);
                fill(255, 10, 100,); // blue highlight
                star(0, 0, 6, 15, 10);
                rotate(count5C)
                fill(51, 51, 51, a);
                pop();
                noStroke();
            }


            text(word, x, lineY);
            x += wordWidth;
            }
        y = lineY + lineHeight + 10;
    }
}


function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

function getTextBoxHeight(txt, boxWidth) {
    let words = txt.split(' ');
    let line = '';
    let lines = 1;
    for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + ' ';
        if (textWidth(testLine) > boxWidth) {
            lines++;
            line = words[i] + ' ';
        } else {
            line = testLine;
        }
    }
    return lines * (textAscent() + textDescent());
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        scrollOffset = max(0, scrollOffset - 30);
    } else if (keyCode === DOWN_ARROW) {
        scrollOffset += 30;
    }
}
