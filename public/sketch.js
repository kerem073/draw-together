const socket = io();
let color;

if (!localStorage.color_red) {
    color = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 110),
        Math.floor(Math.random() * 110) + 145
    ];

    shuffle(color);

    localStorage.color_red = color[0];
    localStorage.color_green = color[1];
    localStorage.color_blue = color[2];
}

socket.on("connect", () => {
    console.log(socket.id);
});

socket.on('mouse', (data) => {
    stroke(data.color[0], data.color[1], data.color[2]);
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
        py: pmouseY,
        color: color
    }

    socket.emit('mouse', data);

    stroke(localStorage.color_red, localStorage.color_green, localStorage.color_blue);

    // stroke(localStorage.color_red, localStorage.color_green, localStorage.color_blue);
    strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
}

function draw() {

}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}