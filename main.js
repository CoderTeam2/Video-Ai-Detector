var state = "";
var video = "";
var obj = [];
function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.position(520, 250);
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    state = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw() {
    image(video, 0, 0, 500, 400);

    if (state != "") {
        objectDetector.detect(video, gotResults);
        document.getElementById("status").innerHTML = "Objects Detected";
        for (i = 0; i < obj.length; i++) {
            document.getElementById("no_of_obj").innerHTML = "No. of objects = " + obj.length;
            fill("orange");
            var p = floor(obj[i].confidence * 100);
            text(obj[i].label + " "+ p + "%", obj[i].x + 15, obj[i].y + 15);
            noFill();
            stroke("red");
            rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        obj = results;
    }
}