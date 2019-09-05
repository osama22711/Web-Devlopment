var canvas = document.querySelector('canvas');
canvas.width= window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


var mouse={
    x:undefined,
    y:undefined
}
var maxRadius = 40;
var numberCircles = 800;

window.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
});
window.addEventListener('resize',function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init()
});

function Circle(x,y,dx,dy,radius,color){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius = radius;
    this.color=color;
    //-------------------I did this in a different way---------------------
    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    ///////////////////////////////////////////////////////////////////////
    //---------------------------------------------------------------------

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = color;
        c.fill();
    }
    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius <0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0 ){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(mouse.x-this.x<50 && mouse.x-this.x>-50 &&     //Gets the center of
            mouse.y-this.y<50 && mouse.y-this.y > -50){  //the circle
            if(this.radius < maxRadius){
                this.radius+=1.5;
            }
        }
        else if(this.radius > this.minRadius){
            this.radius-=1;
        }

        this.draw();
    }
}


var circleArray = [];
var colorArray =['#2980B9','#2C3E50','#ECF0F1','#7F8C8D','#E74C3C'];
var j =0 ;

for(var i = 0; i<numberCircles ; i++){
    var radius = Math.random() * 3 + 1;
    var x = Math.random()*(innerWidth-radius*2)+radius;
    var y = Math.random()*(innerHeight-radius*2)+radius;
    var dx = (Math.random()-0.5);
    var dy = (Math.random()-0.5);
    circleArray.push(new Circle(x,y,dx,dy,radius,colorArray[j]));
    j++;
    if(j>colorArray.length-1){
        j=0;
    }
}
var circleArray = [];
function init(){
    circleArray=[];
    for(var i = 0; i<numberCircles ; i++){
        var radius = Math.random() * 3 + 1;
        var x = Math.random()*(innerWidth-radius*2)+radius;
        var y = Math.random()*(innerHeight-radius*2)+radius;
        var dx = (Math.random()-0.5);
        var dy = (Math.random()-0.5);
        circleArray.push(new Circle(x,y,dx,dy,radius,colorArray[j]));
        j++;
        if(j>colorArray.length-1){
            j=0;
        }
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i =0 ; i<circleArray.length ; i++){
        circleArray[i].update();
    }
}
init();
animate();