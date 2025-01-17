let URL = "https://gpa.madbob.org/query.php?stop=";

function aggiungiPassaggio(linea, orari) {
  // Crea il contenitore principale per ogni linea
  let div = document.createElement("div");
  div.classList.add("linea");

  // Crea il cerchio giallo con il personaggio
  let circle = document.createElement("div");
  circle.classList.add("circle");

  // Aggiungi l'immagine di Surge
  let character = document.createElement("img");
  character.src = "https://media.brawltime.ninja/brawlers/surge/model.png?size=400";
  character.alt = `Linea ${linea}`;

  // Aggiungi il numero della linea sopra l'immagine
  let lineNumber = document.createElement("div");
  lineNumber.classList.add("line-number");
  lineNumber.textContent = linea;

  // Combina immagine e numero dentro il cerchio
  circle.appendChild(character);
  circle.appendChild(lineNumber);

  // Crea il contenitore per gli orari
  let orariText = document.createElement("div");
  orariText.classList.add("orari");
  orariText.textContent = `Orari: ${orari.join(", ")}`;

  // Combina cerchio e testo
  div.appendChild(circle);
  div.appendChild(orariText);

  // Aggiungi il contenitore principale alla lista
  document.getElementById("lista").appendChild(div);
}

function mostra(lista) {
  let listaDiv = document.getElementById("lista");
  listaDiv.innerHTML = ""; // Pulisce i risultati precedenti

  // Raggruppa le linee e i relativi orari
  let linee = {};
  lista.forEach(passaggio => {
    if (!linee[passaggio.line]) {
      linee[passaggio.line] = [];
    }
    linee[passaggio.line].push(passaggio.hour);
  });

  // Aggiunge le linee e i relativi orari alla lista
  for (let linea in linee) {
    aggiungiPassaggio(linea, linee[linea]);
  }
}

function cercafermata() {
  let numeroFermata = document.getElementById("num").value;
  if (!numeroFermata) {
    alert("Inserisci un numero di fermata valido!");
    return;
  }
  fetch(URL + numeroFermata)
    .then(response => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta");
      }
      return response.json();
    })
    .then(data => mostra(data))
    .catch(error => {
      console.error("Errore:", error);
      alert("Impossibile recuperare i dati. Controlla il numero della fermata.");
    });
}
