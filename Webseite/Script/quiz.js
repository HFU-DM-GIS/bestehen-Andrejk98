// Überprüfung, ob der Browser den Local Storage unterstützt
if (typeof (Storage) !== "undefined") {

  // Auswahl aller Elemente mit der Klasse "memory-card"
  const cards = document.querySelectorAll('.memory-card');

  // Speichert umgedrehten Karten 
  let flippedCards = [];

  // Angabe, ob bereits eine Karte umgedreht wurde
  let hasFlippedCard = false;

  // Sperrt das Board, während die Karten überprüft werden
  let lockBoard = false;

   // Variablen für die erste und zweite umgedrehte Karte
  let firstCard, secondCard;



  //alt
    //let id = 1;
  /*let answeredQuestions = window.localStorage.getItem("Question");
  cards.forEach(card => {
  if(card.dataset.framework == answeredQuestions){
    card.removeEventListener("click", flipCard);
    console.log(card);
    
  }
  
  });
  */
  //alt ende



  // Überprüfen, ob im Local Storage bereits Daten für umgedrehte Karten vorhanden sind
  const flippedCardsData = localStorage.getItem('flippedCards');
  if (flippedCardsData) {
    // Wenn Daten vorhanden sind, werden die Karten entsprechend umgedreht
    flippedCards = JSON.parse(flippedCardsData);
    flippedCards.forEach(cardData => {


      /*  const card = document.getElementById(cardId);
      if (card) {
        card.classList.add('flip');
        card.removeEventListener('click', flipCard);*/


      const card = Array.from(cards).find(card => card.getAttribute('data-framework') === cardData.framework);
      if (card != null) {
        card.classList.add('flip');
        card.removeEventListener('click', flipCard);
      }
    });
  }

  // Eventlistener für das Klicken auf eine Karte hinzufügen
  cards.forEach(card => card.addEventListener('click', flipCard));




  //alt
  //Flips the Cards around and then procedes to call the function checkForMatch
  /*function flipCard() {
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
  }*/
  //alt ende



  // Funktion zum Umkehren der Karten
  function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
      // erste Karte
      hasFlippedCard = true;
      firstCard = this;
    } else {
      // zweite Karte
      hasFlippedCard = false;
      secondCard = this;
      checkForMatch();
    }
    // firstCard = null;
    // secondCard = null;
    // hasFlippedCard = false
    // 
  }



  //alt
  //The code checks for a match between the two cards. If there is a match, it will disable the cards and if not, it will flip them over.
  /*function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
    isMatch ? disableCardsandcreateFact() : unflipCards();
  }*/
  //alt ende


  // Funktion zum Überprüfen auf eine Kartenübereinstimmung
  function checkForMatch() {
    const firstAttr = firstCard.getAttribute('data-framework').split("-")
    const secondAttr = secondCard.getAttribute('data-framework').split("-")

    const isMatch = firstAttr[1] === secondAttr[1]

    if (isMatch) {

      // Übereinstimmung: Karten deaktivieren, Pop-up anzeigen und Spielstand speichern
      disableCardsandcreateFact();
    } else {
      // Keine Übereinstimmung: Karten wieder umdrehen
      unflipCards();
    }
    // resetBoard();
  }



  // Funktion zum Deaktivieren der Karten und Anzeigen des Pop-ups
  function disableCardsandcreateFact() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);


    saveFlippedCardsToLocalStorage();


    document.getElementById("myPopup").style.visibility = "visible";
    randomPopupPosition()
    createRandomFact();

    /* window.localStorage.setItem("Question" + id++, JSON.stringify(firstCard.dataset.framework));
     console.log(firstCard.dataset.framework);*/


    setTimeout(() => {
      /*  document.getElementById("myPopup").style.visibility = "hidden";
      }, 8000);
        resetBoard();*/
      document.getElementById("myPopup").style.visibility = "hidden";
      // unflipCards();
      resetBoard();
    }, 8000);
  }

  // Funktion zum Umdrehen der Karten bei Nichtübereinstimmung
  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 1500);
  }

  // Funktion zum Zurücksetzen des Spielfelds-> setzt Zustandsvariablen auf ihren Ursprünglichen Wert zurück
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  // Funktion zum Speichern des Spielstands im Local Storage
  function saveFlippedCardsToLocalStorage() {
    cards.forEach(card => {
      if (card.classList.contains('flip')) {
        //Verhindert Doppelte Einträge
        if (!flippedCards.some(flippedCard => flippedCard.framework === card.getAttribute('data-framework'))) {
          flippedCards.push({
            framework: card.getAttribute('data-framework')
          });
        }
      }
    });
  


    localStorage.setItem('flippedCards', JSON.stringify(flippedCards));


  }

  // Funktion zum Zufällig Anordnen der Karten
  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();

  //cards.forEach(card => card.addEventListener('click', flipCard));


  // Funktion zum Löschen des Spielstands im Local Storage
  function clearLocalStorage() {
    localStorage.clear();
    location.reload();
  }


  // Funktion zum Abrufen eines zufälligen Fakts von der API und Anzeigen im Pop-up
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


  // Funktion zum Zufälligen Positionieren des Pop-ups auf dem Bildschirm
  function randomPopupPosition() {
    var element = document.getElementById('myPopup');
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    var randomLeft = Math.floor(Math.random() * (viewportWidth - element.offsetWidth));
    var randomTop = Math.floor(Math.random() * (viewportHeight - element.offsetHeight));

    element.style.left = randomLeft + 'px';
    element.style.top = randomTop + 'px';
  };

  // Funktion zum Ausblenden des Pop-ups
  function closePopup() {
    document.getElementById("myPopup").style.visibility = "hidden";
  }
}

/* POP UP */