

function ChangePicture(){
    if(event.target.nodeName != 'IMG') return;
    if(mainPicture.src ==  event.target.src) return;
    if(img.src ==  mainPicture.src) return;

    let srcTmp =  mainPicture.src;
    mainPicture.src =  img.src;
    event.target.src = srcTmp; 
}
let img;
function LoadGallery(){
    img = new Image();
    img.src = 'images/Cookie1.jpg';
}


function PreloadImage()
{
    if(event.target.nodeName != 'IMG') return;

    if(img.src ==  event.target.src) return;

    img = new Image();
    img.src = event.target.src;
}