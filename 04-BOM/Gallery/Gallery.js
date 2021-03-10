function ShowInfoPicture(picture){
  let path = picture.currentSrc;
  let startNameIndex = path.lastIndexOf('/') + 1;
  let endNameIndex = path.lastIndexOf('.');
  let name = picture.currentSrc.slice(startNameIndex,endNameIndex);
  let message = `Name: ${name} Width: ${picture.clientWidth}\nHeight: ${picture.clientHeight}`;
  document.title = message;
}
function OpenPicture(){
  let currSrcPicture = event.target.currentSrc;
  let path = currSrcPicture.replace('/SMALL','');
  window.open('Picture.html?' + path, 'example', "width=300,height=300");
}
