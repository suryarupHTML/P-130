leftWristx = 0;
leftWristy = 0; 
rightWristx = 0; 
rightWristy = 0;
song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
scoreRightWrist = "";
scoreLeftWrist = "";
function preload() 
{   
    song1 = loadSound("music.mp3");     
    song2 = loadSound("music2.mp3"); 
}
function setup()
{    
    canvas = createCanvaas(600, 500);
    canvas.center(); 
    video = createCapture(VIDEO);     
    video.size(550, 500);     
    video.position(500, 200);  
    poseNet = ml5.poseNet(video, modelLoaded);     
    poseNet.on('pose', gotPoses); 
}
function modelLoaded() 
{    
    console.log("poseNet is initialized"); 
}
function gotPoses(results) 
{    
    if(results[0].length > 0)    
    { 
        console.log(results);        
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;        
        leftWristY = results[0].pose.leftWrist.y;      
        console.log("leftWristX = " + leftWristX + ", leftWristY = " + leftWristY);        
        rightWristX = results[0].pose.rightWrist.x;        
        rightWristY = results[0].pode.rightWrist.y;        
        console.log("rightWristX = " + rightWristX + ", rightWristY = " + rightWristY);    
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    stroke("#FF0000");
    
    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing: Harry Potter Theme Song";
        }
    }
    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing: Harry Potter Theme Song";
        }
    }
    
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}