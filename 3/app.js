function init(){
    const header = document.querySelector(".header");
    const online = document.querySelector(".square-box-online");
    const offline = document.querySelector(".square-box-offline");
    const request = document.querySelector(".longSquare-box");
    const call = document.querySelector(".call-box");
    const message = document.querySelector(".message-box");
    online.addEventListener("click", function() {
        header.style.backgroundColor = 'rgba(152, 191, 157, 0.3)';
      });
    offline.addEventListener("click", function() {
        header.style.backgroundColor = 'rgba(233,127,136, 0.3)';
    });
    request.addEventListener("click", function() {
        header.style.backgroundColor = 'rgba(186,194,217, 0.3)';
    });
    call.addEventListener("click", function() {
        alert("Not Added To Friendlist !..");
    });
    message.addEventListener("click", function() {
        alert("Not Added To Friendlist !..");
    });
}

init();