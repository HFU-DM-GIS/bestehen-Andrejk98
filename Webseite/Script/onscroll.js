
      /* DOM-Elemente werden per IDs abgerufen und in einer Variable(Referenz) gespeichert, welche auf das DOM Element zeigt.    */

  let hi = document.getElementById("hi");
  let bo = document.getElementById("bo");
  let bi = document.getElementById("bi");

  let fi = document.getElementById("fi");
  let zi = document.getElementById("zi");


      /* Anlegen der Boolean Variablen, um später Code auszuführen, bzw. nicht auszuführen */
  let isLarged = false;
  let moved = false;



      /* EventListener, der jedes mal den Code ausführt, wenn man scrollt. */
window.addEventListener('scroll',function()
{


      /* Ort an dem sich das Viewport, relativ zur Gesamten Webseite befindet, bzw. wo die Scrollbar sich befindet */
    var value = window.scrollY;

      /* Parallax Scrolling -> Himmel geht nach unten, Boden nach oben, Vögel nach links und der Text nach unten  */
    hi.style.top = value * 0.5 + 'px';
    bi.style.left = -value * 2 + 'px'; 
    bo.style.top = -value * 0.15 + 'px';
    text.style.top = value * 1 + 'px';


      /* Wenn die Scrollbar (Position) über 300 ist, soll der Text, der sich nach unten bewegt, nicht mehr sichtbar sein. */
    if (value > 300) {
        text.style.opacity = '0';
    } else {
        text.style.opacity = '1';
    }

      /* Wenn die Scrollbar (Position) über 450 ist, soll die Himmel-Grafik, die sich nach unten bewegt, nicht mehr sichtbar sein. */
    if (value > 450) {
      
      hi.style.opacity = '0';
  } else {
      
      hi.style.opacity = '1';  
  }


      
      /* Ausführen der beiden Funktionen durch scrollen. */

    move();
    change();
  


    

})




      /* Die Funktion wird alle 100ms ausgeführt und der Code der Abfrage nur, wenn die Funktion change(), noch nicht ausgeführt worden ist. */
let interval = setInterval(function() {
    if(isLarged == false){
    change();
    }
  }, 100);



    
function change(){

      /* Gibt DOMRect-Objekte zurück, die Informationen über die Größe und Position der Elemente relativ zum Anzeigebereich des Viewports enthält. Diese werden hier
      in einer Variable gespeichert, welche die Manipulation/Lokalisierung des Elements ermöglicht durch die Referenz. */

    let rectfi = fi.getBoundingClientRect();
    let rectzi = zi.getBoundingClientRect();


      /* Wenn die rechte Kante der Fisch-Grafik größer oder gleich ist als wie die linke Kante der Ziel-Grafik und die Funktion
     noch nicht ausgeführt wurde, soll die Ziel-Grafik verschwinden und die Fisch-Grafik durch eine Hai-Grafik ersetzt werden. */

    if (rectfi.right >= rectzi.left && isLarged == false) {
        zi.style.visibility = "hidden";
        fi.src = "./Webseite/Bild/shark.png";

      }

      /* Ansonsten soll die Fisch-Grafik bleiben, bzw wieder die Werte wieder zurückgesetzt werden */

      else {
        zi.style.visibility = "visible";
        fi.src = "./Webseite/Bild/fish.png";
      }


}






function move() {
  
  let rectfi = fi.getBoundingClientRect();
  let rectzi = zi.getBoundingClientRect();

  /* Wenn die obere Kante der Fisch-Grafik kleiner als die Fensterhöhe ist und die untere Kante größer als 0 ist,
   bedeutet das, dass sich die Fisch-Grafik im sichtbaren Bereich des Bildschirms befindet. */

  if (rectfi.top < window.innerHeight && rectfi.bottom > 0) {

      /* Der Übergangseffekt und die Transformationsanimation werden auf das DOM-Element 'fi' angewendet, um es horizontal zu verschieben. */
      fi.style.transition = 'transform 4s ease'; 
      fi.style.transform = `translateX(${rectzi.left - 150}px)`;
      
      
      
  } else {
      
      /* Wenn sich die Fisch-Grafik nicht mehr im sichtbaren Bereich des Bildschirms befindet, wird sie wieder in ihre ursprüngliche Position zurückversetzt. */
      fi.style.transition = 'transform 2s ease'; 
      fi.style.transform = 'translateX(0)';
  }
}







    

    










