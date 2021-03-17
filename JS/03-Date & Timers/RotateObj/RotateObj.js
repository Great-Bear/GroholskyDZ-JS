const CORRECTION_VALUE_X = 8,CORRECTION_VALUE_Y = 26;
const UNIT_POSITION = 'px';
function ChangePos(){
let posX = event.pageX - CORRECTION_VALUE_X;
let posY = event.pageY - CORRECTION_VALUE_Y;
obj.style.marginTop = posY + UNIT_POSITION;
obj.style.marginLeft = posX + UNIT_POSITION;
}
const MAX_TITLE_ANGLE = 360, MIX_TITLE_ANGLE = 10;
const UNIT_TITLE_ANGLE = 'deg';
let tiltAngle = MIX_TITLE_ANGLE;
function ChangeRotate(){
  if(tiltAngle > MAX_TITLE_ANGLE){
    tiltAngle = MIX_TITLE_ANGLE;
  }
  obj.style.transform = `rotate(${tiltAngle}${UNIT_TITLE_ANGLE})`;
    tiltAngle++;
}
function StartRotate(){
  setInterval(ChangeRotate, 0);
}

