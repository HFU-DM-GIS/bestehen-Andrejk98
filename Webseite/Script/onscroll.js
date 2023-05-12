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


    if(rect.top < window.innerHeight && rect.bottom > 0){

        console.log('im Bildschirm')

        /* Fisch img bewegen*/
        

          }
          else {
            console.log(' nicht im Bildschirm')
          }

   
    
    
    for (const key in rect) {
      if (typeof rect[key] !== "function") {
        console.log(`${key} : ${rect[key]}`)
        
      }
    }
    

});







    

    










