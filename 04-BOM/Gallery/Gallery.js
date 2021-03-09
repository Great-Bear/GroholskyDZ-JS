function OpenPicture(){
    let widthPicture = event.target.clientWidth;
    let heighyPicture = event.target.clientHeight;
    let messageLine = `Width: ${widthPicture}\nHeight: ${heighyPicture}`;
    window.status = messageLine;
  //  alert(messageLine);

  let currSrcPicture = event.target.currentSrc;
  let path = currSrcPicture.replace('/SMALL','');
  window.open('Picture.html?' + path, 'example', "width=300,height=300");
}
