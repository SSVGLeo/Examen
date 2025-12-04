import { Player } from "../class/player.js";

// Définition de tous les éléments dans le dom
let nom = document.querySelector("#playerName");
let surname = document.querySelector("#playerSurname");
let team = document.querySelector("#playerTeam");
let game = document.querySelector("#playerGame");
let role = document.querySelector("#playerRole");
let nationality = document.querySelector("#playerNationality");
// Définition de la div qui va renvoyer un message après modifs
let responseContainer = document.querySelector("#responseContainer");

// Récupération de l'id du joueur en passant par l'url de la page
let url = window.location;
let playerid = url.hash.substring(1);

// Définition du chemin de récup de l'info du joueur et des options
let myHeaders = new Headers();
let path = `/getPlayers/${playerid}`;
let options = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};

fetch(path, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur HTTP");
    }
    return response.json();
  })
  .then((data) => {
    // On fait un nouveau player en utilisant la classe créée
    const player = new Player(
      data._id,
      data.name,
      data.surname,
      data.team,
      data.game,
      data.role,
      data.nationality
    );
    // On remplit les champs dans le dom avec les valeurs du player dans la BDD
    nom.value = player.name;
    surname.value = player.surname;
    team.value = player.team;
    game.value = player.game;
    role.value = player.role;
    nationality.value = player.nationality;
  })
  .catch((error) => {
    console.log("Erreur lors du fetch du joueur", error);
  });

  // Fonction qui va permettre d'envoyer les informations présentes dans le dom
  // Dans la BDD
function modifyPlayer() {
  let tmp = {
    name: nom.value,
    surname: surname.value,
    team: team.value,
    game: game.value,
    role: role.value,
    nationality: nationality.value,
  };

  // url pour la modification d'un player
  let urlModif = `/updatePlayer/${playerid}`;

  let optionsModif = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    mode: "cors",
    cache: "default",
    body: JSON.stringify(tmp),
  };

  fetch(urlModif, optionsModif).then((res) => {
    // Si la réponse est ok on va juste envoyer un message de confirmation dans le dom
    if (res.ok) {
      responseContainer.innerHTML += `<p>Modifications prises en compte</p>`;
    } 
    // Sinon on renvoie un message d'erreur
    else {
      responseContainer.innerHTML += `<p>Problème lors des modifications</p>`;
    }
  });
}

let modifButton = document.querySelector("#modifyPlayer");


modifButton.addEventListener("click", (e) => {
  e.preventDefault();
  modifyPlayer();
});
