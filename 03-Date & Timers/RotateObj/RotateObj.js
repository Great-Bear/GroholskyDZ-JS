function ChangePos(){
let posX = event.pageX - 58;
let posY = event.pageY - 73;
  Obj.style.marginTop = posY + 'px';
  Obj.style.marginLeft = posX + 'px';
}

let tiltAngle = 10;
function ChangeRotate(){
          Obj.style.transform = `rotate(${tiltAngle}deg)`;
          tiltAngle++;
}

