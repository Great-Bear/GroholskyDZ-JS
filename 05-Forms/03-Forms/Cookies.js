function SaveForm(){
    debugger;
    document.cookie = "user=John"; // обновляем только куки с именем 'user'
alert(document.cookie);
}
function ReadCookies(){
    alert(document.cookie); 
}