let hi = document.getElementById("hi");
let bo = document.getElementById("bo");
let bi = document.getElementById("bi");
let fi = document.getElementById("fi");
let div = document.getElementById("zwei");

window.addEventListener('scroll',function()
{
    var value = window.scrollY;
    hi.style.top = value * 0.5 + 'px';
    bi.style.left = -value * 2 + 'px'; 
    bo.style.top = -value * 0.15 + 'px';
    text.style.top = value * 1 + 'px';
    
    if (value > 500) {
        text.style.opacity = '0';
        hi.style.opacity = '0';
    } else {
        text.style.opacity = '1';
        hi.style.opacity = '1';  
    }

    

    



})






