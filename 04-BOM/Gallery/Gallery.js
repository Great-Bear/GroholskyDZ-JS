function ShowInfoPicture(){
  let widthPicture = event.target.clientWidth;
  let heighyPicture = event.target.clientHeight;
  let namePicture = event.target.currentSrc.slice(event.target.currentSrc.lastIndexOf('/') + 1,event.target.currentSrc.lastIndexOf('.'));
  let messageLine = `Name:${namePicture} Width: ${widthPicture}\nHeight: ${heighyPicture}`;
  document.title = messageLine;
}

function OpenPicture(){ 
  let currSrcPicture = event.target.currentSrc;
  let path = currSrcPicture.replace('/SMALL','');
  window.open('Picture.html?' + path, 'example', "width=300,height=300");
}
