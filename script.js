// II.01. We're copy-pasting canvas API: (NOTE: From mozilla DOCS => Read more there!)
const canvas = document.getElementById('canvas')
// NOTE: Here we create a context 
const ctx = canvas.getContext('2d');
// IV.01. We start by bringing in all the controllers what we need:
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

// II.04. Setting a variable for the size: (NOTE: A global variable)
let size = 20;
// III.02. We create another global variable for isPressed: (NOTE: We want to know if the mouse's being pressed)
isPressed = false;
// II.06. Setting a variable for changing the color:
let color = 'black';
// II.15. We want the x and y values to be global as well: (NOTE: It's enough, if we just initialize them)
// AFTER: Next lecture we'll carry on with our mouse event (section III.)
let x; 
let y;

// III.01. First we'll add an eventListener to our canvas: (NOTE: We have to pass in an event object)
canvas.addEventListener('mousedown', (e) => {
    // III.03. Once we'll press mousedown isPressed is going to be true:
    isPressed = true;
    // III.04. We also want to set the position of where the mouse is: (NOTE: That's why we have let x, and let y)
    // NOTE: This'll give us the position where the mouse is
    x = e.offsetX;
    y = e.offsetY;
    // Testing: (NOTE: This should give us back true, and the numbers for x and y on the canvas)
    // console.log(isPressed, x, y);
})

// III.05. We add an eventlistener for "mouseup":
canvas.addEventListener('mouseup', (e) => {
    // NOTE: We set back isPressed to false
    isPressed = false;
    // NOTE: And set the x and y to be undefined:
    x = undefined;
    y = undefined;
})

// III.06. Another event for "mousemove":
canvas.addEventListener('mousemove', (e) => {
    // III.07. We create a boolean:
    // NOTE: If isPressed true we set the x2 positioning, and the same thing applies for y
    if(isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        // Testing: (NOTE: Now when we click, and hold we can see where x, and y position is)
        // console.log(x2, y2);
        // III.08. We're calling here drawCircle(): (NOTE: We're setting the position with the x2, and y2)
        drawCircle(x2, y2);
        // III.09. In addition to draw circle, we also want to draw a line: (NOTE: Also with the x2, and y2 + x and y)
        drawLine(x, y, x2, y2);
        // III.10. After we set the x where the x2 value is, and the same with the y value:
        // AFTER: In the next lecture we'll make the controllers work (size, color, clear...) (in Section IV.)
        x = x2;
        y = y2;   
    }
})

// II.02. We create a function drawCircle: (NOTE: It'll take an x value, and y value)
// NOTE: x and y stands for the positioning on the canvas
const drawCircle = (x, y) => {
    // II.03. Here we also use code from DOCS:
    ctx.beginPath();
    // NOTE: We're going to use here x and y, and create an external variable (let size) => That we can change later!
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    // II.05. To make this work we have set a color on the circle: (NOTE: We also have to add a global variable for color)
    ctx.fillStyle = color;
    // II.07. After we have the color we'll call fill on the circle:
    ctx.fill();
}

// II.09. We also want to be able to draw a line, so we create a function for that:
// NOTE: This is going to take the "move to" x and y positions (x1, y1), and where we want to draw the line (x2, y2)  
const drawLine = (x1, y1, x2, y2) => {
    // II.10. We start with calling bethinPath():
    ctx.beginPath();
    // NOTE: This isn't drawing anything just moving to it!
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    // II.11. Then we want to apply a color: (NOTE: This is like a border kinda)
    ctx.strokeStyle = color;
    // II.12. We also want to apply the size:
    // NOTE: We have to multiply it with 2, so it will keep a straight line width, anyway it will shrink down a bit!
    ctx.lineWidth = size * 2;
    // II.13. If we want to draw a line we need to call drawStroke at the end:
    ctx.stroke();
}

// IV.07. Adding updateSizeOnScreen() function:
const updateSizeOnScreen = () => {
    // NOTE: We're setting the innerText to whatever size is => Test it, if it works!
    sizeEl.innerText = size;
}

// Testing: (NOTE: We're going to place this to the mouse event, so it'll be dynamic)
// II.08. We're calling the function: (NOTE: We have to give the x and y access) => Test it, if you can see it! 
// drawCircle(100, 200);
// II.14. We're calling the drawLine function: (NOTE: We should see a line)
// NOTE: The first two number is the moveTo, and the second two arg is the lineTo
// drawLine(300, 300, 300, 500);

// IV.02. We add an eventlistener to the color: (NOTE: We use the "change" event, and we pass in event object)
colorEl.addEventListener('change', (e) => {
    // IV.03. We're taking the color variable, and set it to be equal to the value on the event object: (NOTE: e.target.value)
    // NOTE: Test it if you can change the color
    color = e.target.value;
});

// IV.04. We add event listener to increaseBtn:
increaseBtn.addEventListener('click', () => {
    // NOTE: When we click we add +5 to the size
    size += 5;
    // IV.05. We add a boolean to make sure size won't gove above 50:
    if (size > 50) {
        size = 50;
    }
    // IV.06. Then we're calling function updateSizeOnScreen():
    updateSizeOnScreen();
});

// IV.08. We add event for decreasing the size: (NOTE: Pretty much goes with the same logic as increaseBtn)
decreaseBtn.addEventListener('click', () => {
    size -= 5;
    if (size < 5) {
        size = 5;
    }
    updateSizeOnScreen();
})

// IV.09. We're calling a method clear rect: (NOTE: This is going to clear the entire canvas!)
clearEl.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))
