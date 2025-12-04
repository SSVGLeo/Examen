import { Player } from "../class/player.js";

let nom = document.querySelector("#playerName");
let surname = document.querySelector("#playerSurname");
let team = document.querySelector("#playerTeam");
let game = document.querySelector("#playerGame");
let role = document.querySelector("#playerRole");
let nationality = document.querySelector("#playerNationality");

let url = window.location;
let playerid = url.hash.substring(1);

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
    console.log(data);
    const player = new Player(
      data._id,
      data.name,
      data.surname,
      data.team,
      data.game,
      data.role,
      data.nationality,
    );
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
