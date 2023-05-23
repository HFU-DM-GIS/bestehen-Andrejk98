const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

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

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  createRandomFact();

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

/* POP UP */

const API_URL = "https://publicapi.dev/random-useless-facts-api";

function createRandomFact() {
  // Hier wird mit der fetch() Methode die API aufgerufen
  fetch('https://uselessfacts.jsph.pl/random.json?language=de')
    .then(response => response.json()) // Hier wird die Antwort in JSON umgewandelt
    .then(data => {
      const fakt = data.text; // Hier wird der zufällige Fakt aus dem JSON-Objekt extrahiert
      // Hier wird der Fakt in das HTML-Dokument eingefügt
      document.getElementById("random-fact").textContent = fakt;
    })
    .catch(error => console.error(error)); // Hier wird eine Fehlerbehandlung durchgeführt

    function openPopup() {
      document.getElementById("myPopup").style.display = "block";
    }
    



}


function closePopup() {
  document.getElementById("myPopup").style.display = "none";
}

/* POP UP */