function init(){
    const header = document.querySelector(".header");
    const online = document.querySelector(".square-box-online");
    const offline = document.querySelector(".square-box-offline");
    const request = document.querySelector(".longSquare-box");
    const calls = document.querySelectorAll(".call-box");
    const messages = document.querySelectorAll(".message-box"); 
    online.addEventListener("click", function() {
        header.style.backgroundColor = 'rgba(152, 191, 157, 0.25)';
        header.style.filter = 'drop-shadow(0px 10px 3px rgba(34, 94, 42, 0.2)';
      });
    offline.addEventListener("click", function() {
        header.style.backgroundColor = 'rgba(166,3,17, 0.08)';
        header.style.filter = 'drop-shadow(0px 10px 3px rgba(94, 34, 34, 0.2)';
    });
    request.addEventListener("click", function() {
        header.style.backgroundColor = 'rgba(186,194,217, 0.25)';
        header.style.filter = 'drop-shadow(0px 10px 3px rgba(109, 112, 123, 0.2)';
    });
    calls.forEach((call, index) => {
        call.addEventListener("click", function() {
          alert("Not In Your Friendlist !..");
        });
    });
    messages.forEach((message, index) => {
        message.addEventListener("click", function() {
          alert("Not In Your Friendlist !..");
        });
    });
}

init();