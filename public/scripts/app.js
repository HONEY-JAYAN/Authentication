// IIFE - Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App started...");
    }

    window.addEventListener("load", Start);

});

const user_name = 'honeyjayan';
const password = '12345';

function authentication(){
    var userName = document.getElementById('username');
    var passWord = document.getElementById('password');
    if(userName==user_name && password==passWord){
        window.location.href = "/contact-list";
    }
    else{
        window.location.href = "/login";
    }
}