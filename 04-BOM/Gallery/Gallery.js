<<<<<<< HEAD
function ShowInfoPicture(picture){
  let path = picture.currentSrc;
  let startNameIndex = path.lastIndexOf('/') + 1;
  let endNameIndex = path.lastIndexOf('.');
  let name = picture.currentSrc.slice(startNameIndex,endNameIndex);
  let message = `Name: ${name} Width: ${picture.clientWidth}\nHeight: ${picture.clientHeight}`;
  document.title = message;
}
function OpenPicture(){
=======
function ShowInfoPicture(){
  let widthPicture = event.target.clientWidth;
  let heighyPicture = event.target.clientHeight;
  let namePicture = event.target.currentSrc.slice(event.target.currentSrc.lastIndexOf('/') + 1,event.target.currentSrc.lastIndexOf('.'));
  let messageLine = `Name:${namePicture} Width: ${widthPicture}\nHeight: ${heighyPicture}`;
  document.title = messageLine;
}

function OpenPicture(){ 
>>>>>>> cf71cdc6b7e81e008687ad3627c69ebc5376c62b
  let currSrcPicture = event.target.currentSrc;
  let path = currSrcPicture.replace('/SMALL','');
  window.open('Picture.html?' + path, 'example', "width=300,height=300");
}
