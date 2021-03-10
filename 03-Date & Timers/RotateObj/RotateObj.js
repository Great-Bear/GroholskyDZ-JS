const CORRECTION_VALUE_X = 8,CORRECTION_VALUE_Y = 26;
function ChangePos(){
let posX = event.pageX - CORRECTION_VALUE_X;
let posY = event.pageY - CORRECTION_VALUE_Y;
obj.style.marginTop = posY + 'px';
obj.style.marginLeft = posX + 'px';
}
const MAX_TITLE_ANGLE = 360, MIX_TITLE_ANGLE = 10;
let tiltAngle = MIX_TITLE_ANGLE;
function ChangeRotate(){
  if(tiltAngle > MAX_TITLE_ANGLE){
    tiltAngle = MIX_TITLE_ANGLE;
  }
  obj.style.transform = `rotate(${tiltAngle}deg)`;
    tiltAngle++;
}
function StartRotate(){
  setInterval(ChangeRotate, 0);
}

