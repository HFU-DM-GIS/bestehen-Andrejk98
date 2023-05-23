const b = document.getElementById("najabutton");
b.addEventListener("mouseover", moveHover);
var container = document.getElementById("buttoncontainer");

function moveHover(){

    var containerRect = container.getBoundingClientRect();
    var containerWidth = containerRect.width;
    var containerHeight = containerRect.height;

    var buttonRect = b.getBoundingClientRect();
    var buttonWidth = buttonRect.width;
    var buttonHeight = buttonRect.height;

    var maxX = containerWidth - buttonWidth;
    var maxY = containerHeight - buttonHeight;

    const i = Math.floor(Math.random() * maxX);
    const j = Math.floor(Math.random() * maxY);

    b.style.position = "absolute";
    b.style.left = i + "px";
    b.style.top = j + "px";

}