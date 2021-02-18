function CreateNewList(){

    let ul = document.createElement('ul');

//ul.addEventListener('click',e => alert(e.target))




  ul.innerHTML = '<li>New list'+
                        '<ul>'+
                            '<li>item1</li>'+
                        '</ul>'+
                 '</il>';

    document.body.append(ul);



    function hide(e){
        // e.target ссылается на кликнутый <li> элемент
        // Он отличается от e.currentTarget который будет ссылаться на родительский <ul> в этом контексте
    //    e.target.style.visibility = 'hidden';
       alert(e.target.style.innerHTML);
      }
      
      // Назначим обработчик к списку
      // Он будет вызван когда кликнут на любой <li>
      ul.addEventListener('click', hide, false);


}