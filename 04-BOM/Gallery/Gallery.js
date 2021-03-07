function stateLine(){
    let widthPicture = event.target.clientWidth;
    let heighyPicture = event.target.clientHeight;
    let messageLine = `Width: ${widthPicture}\nHeight: ${heighyPicture}`;
    window.status = messageLine;
  //  alert(messageLine);

  let newSCR = event.target.currentSrc;
  newSCR = newSCR.replace('/SMALL','');

    var img = new Image();
    img.src = newSCR;
    
    /*let newWin = window.open('about:blank', 'example', "width=200,height=200");
    newWin.document.body.appendChild(img);

  newWin.document.body.onload = () => {
    event.target;
    debugger;
  }*/

  //let wim = window.open('/', 'example', "width=200,height=200");

  var newWin = window.open('about:blank', 'example', 'width=600,height=400');
  newWin.onload = function() {
    document.write = 'fsfads';
    debugger;
    // создать div в документе нового окна
    var div = newWin.document.createElement('div'),
        body = newWin.document.body;
  
    div.innerHTML = 'Добро пожаловать!'
    div.style.fontSize = '30px'
  
    // вставить первым элементом в body нового окна
    body.insertBefore(div, body.firstChild);
  }
  //newWin.document.body.appendChild(img);
 
}
