const socket = io();

socket.on("connect", () => {
    console.log(socket.id);
});

socket.on('mouse', (data) => {
    stroke(255, 0, 140);
    strokeWeight(10);
    line(data.x, data.y, data.px, data.py);
});

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    // canvas.parent("canvas");
    background(51);
}

function mouseDragged() {
    console.log(mouseX + ', ' + mouseY);

    const data = {
        x: mouseX,
        y: mouseY,
        px: pmouseX,
        py: pmouseY
    }

    socket.emit('mouse', data);

    stroke(255);
    strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
}

function draw() {

}