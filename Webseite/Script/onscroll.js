let hi = document.getElementById("hi");
let bo = document.getElementById("bo");
let bi = document.getElementById("bi");

let fi = document.getElementById("fi");
let zi = document.getElementById("zi");




window.addEventListener('scroll',function()
{

    const rect = fi.getBoundingClientRect();
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

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

    if(moved == false)
    move();
    if(isLarged == false){
    grow();
    }


    

})





let interval = setInterval(function() {
    if(isLarged == false){
    grow();
    }
  }, 100);

let isLarged = false;
let moved = false;


function grow(){

    let rectfi = fi.getBoundingClientRect();
    let rectzi = zi.getBoundingClientRect();
    let scrolly = window.scrollY;

    if (rectfi.right >= rectzi.left && isLarged == false) {
        zi.style.visibility = "hidden";
        fi.src = "Bild/shark.png";
        

        /* let currentWidth = parseFloat(window.getComputedStyle(fi).width);
        let currentHeight = parseFloat(window.getComputedStyle(fi).height);
        let newWidth = currentWidth * 1.2; 
        let newHeight = currentHeight * 1.2; 
        fi.style.width = newWidth + "px";
        fi.style.height = newHeight + "px"; */
        isLarged = true;

        

      }


}





function move() {

    let rectfi = fi.getBoundingClientRect();
    let rectzi = zi.getBoundingClientRect();
    let scrolly = window.scrollY;

    if (rectfi.top < window.innerHeight && rectfi.bottom > 0) {
  
      fi.style.transition = 'transform 4s ease'; 
        fi.style.transform = `translateX(${rectzi.left - 150}px)`;
        
        moved = true;

      
    } else {
      console.log('Nicht im Bildschirm');
        fi.style.transition = 'transform 2s ease'; 
        fi.style.transform = 'translateX(0)';
    }


    
  }







    

    










