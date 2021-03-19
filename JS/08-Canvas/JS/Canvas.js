function PrintClock(canvasElem){
    canvasElem.width = 800;
    canvasElem.height = 800;
    DrawCircle(canvasElem,400,400,100,'yellow',995,'blue');
    DrawCircle(canvasElem,400,400,100,'none',400,'green');

 let r = document.getElementById('canvasElem');
 let r2 = r.getContext('2d');

 r2.rotata(45 * Math.PI/180);
 r2.fillRect(70,0,100,30);
 r2.setTransform(1,0,0,1,0,0);
}
function DrawCircle(canvas,leftM,topM,radius,color,widthBorder,colorBorder){
    let obCanvas = canvas.getContext('2d');
    obCanvas.beginPath();
    obCanvas.arc(leftM,topM,radius,0,2 * Math.PI,false);
    obCanvas.fillStyle = color;
    obCanvas.fill();
    obCanvas.lineWidth
    obCanvas.lineWidth = widthBorder;
    obCanvas.strokeStyle = colorBorder;
    obCanvas.stroke();

}
function circle()
{
	var canvas = document.getElementById('circle');
	var obCanvas = canvas.getContext('2d');	
	obCanvas.beginPath();
	obCanvas.arc(150, 75, 50, 0, 2*Math.PI, false);
	obCanvas.fillStyle = 'red';
	obCanvas.fill();
	obCanvas.lineWidth = 10;
	obCanvas.strokeStyle = 'blue';
	obCanvas.stroke();
}