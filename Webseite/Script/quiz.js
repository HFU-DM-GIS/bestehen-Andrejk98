const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const cardArray = [];

//Flips the Cards around and then procedes to call the function checkForMatch
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

//The code checks for a match between the two cards. If there is a match, it will disable the cards and if not, it will flip them over.
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCardsandcreateFact() : unflipCards();
}

//Disables the Cards by removing the EventListener "click" and creates a Pop-Up with a random Fact
function disableCardsandcreateFact() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  document.getElementById("myPopup").style.visibility = "visible";
  randomPopupPosition()
  createRandomFact();

  window.localStorage.setItem("Question",firstCard.dataset.framework);
  console.log(firstCard.dataset.framework);

  setTimeout(() => {
    document.getElementById("myPopup").style.visibility = "hidden";
  }, 8000);

  resetBoard();
}

//Function unflips the Cards if they don´t match by removing the classList "flip"
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

//Resets the Board after a Match by putting everything to false or null
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//Sets a random position for every Card
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}

/* POP UP */

const API_URL = "https://publicapi.dev/random-useless-facts-api";

function createRandomFact() {
  // Hier wird mit der fetch() Methode die API aufgerufen
  fetch('https://uselessfacts.jsph.pl/random.json?language=de')
    .then(response => response.json()) // Hier wird die Antwort in JSON umgewandelt
    .then(data => {
      const fact = data.text; // Hier wird der zufällige Fakt aus dem JSON-Objekt extrahiert
      // Hier wird der Fakt in das HTML-Dokument eingefügt
      
      document.getElementById("random-fact").textContent = fact;
    })
    .catch(error => console.error(error)); // Hier wird eine Fehlerbehandlung durchgeführt


}


function randomPopupPosition() {
  var element = document.getElementById('myPopup');
  var viewportWidth = window.innerWidth;
  var viewportHeight = window.innerHeight;

  var randomLeft = Math.floor(Math.random() * (viewportWidth - element.offsetWidth));
  var randomTop = Math.floor(Math.random() * (viewportHeight - element.offsetHeight));

  element.style.left = randomLeft + 'px';
  element.style.top = randomTop + 'px';
};

function closePopup() {
  document.getElementById("myPopup").style.visibility = "hidden";
}


/* POP UP */