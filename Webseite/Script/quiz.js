const cards = document.querySelectorAll(".card");
const resetButton = document.querySelector("#reset");

const API_URL = "https://publicapi.dev/random-useless-facts-api";

let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  if (!flippedCard) {
    this.classList.add("selected");
    console.log(this.firstChild);
    this.firstChild.classList.add("flipped");
    flippedCard = true;
    firstCard = this;
    return;
  }
  this.classList.add("selected");
  this.firstChild.classList.add("flipped");
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  firstCard.classList.add("correct");
  secondCard.classList.add("correct");
  resetBoard();
  createRandomFact();
}

function unflipCards() {
  lockBoard = true;
  firstCard.classList.add("incorrect");
  secondCard.classList.add("incorrect");

  setTimeout(() => {
    firstCard.classList.remove("selected", "incorrect");
    secondCard.classList.remove("selected", "incorrect");
    firstCard.firstChild.classList.remove("flipped");
    secondCard.firstChild.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach((card) => card.addEventListener("click", flipCard));
resetButton.addEventListener("click", () => {
  location.reload();
});

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
}