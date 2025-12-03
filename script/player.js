// On créer la fonction addOneRow qui va créer une ligne dans le tableau
// Pour chaque joueur présent dans la BDD

function addOneRow(data) {
  const table = document.querySelector("#tablePlayer");

  table.innerHTML += `
        <tr id="${data._id}">
            <td>${data.name}</td>
            <td>${data.surname}</td>
            <td>${data.team}</td>
            <td>${data.game}</td>
            <td>${data.role}</td>
            <td>${data.nationality}</td>
            <td> <button> Supprimer ce joueur </button> </td>
            <td><a href="./detail.html#${data._id}">Détails :</a></td>
        </tr>
        `;
  // Il faudra rajouter dans le bouton l'appel de la fonction supprimer
  // Qui prendra en paramêtre le data._id du joueur
}

// On fait le code pour fetch toutes les données des joueurs de la BDD
// Et on va les utiliser pour les afficher dans le DOM
function getPlayers() {
  let myHeaders = new Headers();
  let url = "/getPlayers";
  let options = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Il y a eu une erreur lors de l'import des joeurs", error);
      }
    })
    .then((data) => {
      data.forEach((element) => {
        addOneRow(element);
      });
    })
    .catch((error) => {
      console.log("Erreur : ", error);
    });
}

getPlayers();

// On créer une fonction addPlayer qui va récupérer les valeurs dans le dom
// Pour les ajouter à la base de données en suivant le Schéma définit

function addPlayer() {
  // On récupère les valeurs dans le dom
  let name = document.querySelector("#playerName");
  let surname = document.querySelector("#playerSurname");
  let team = document.querySelector("#playerTeam");
  let game = document.querySelector("#playerGame");
  let role = document.querySelector("#playerRole");
  let nationality = document.querySelector("#playerNationality");

  // On créer un objet player temporaire en respectant le schéma
  let player = {
    name: name.value,
    surname: surname.value,
    team: team.value,
    game: game.value,
    role: role.value,
    nationality: nationality.value,
  };

  //   On définit l'url pour faire la requête POST d'un nouveau joueur
  let url = "/addPlayer";

  //   On définit les options de la requête fetch POST
  let options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
    body: JSON.stringify(player),
  };

  // J'ajoute ici une sécurité pour vérifier que tous les champs soient bien remplis
  if (
    name.value === "" ||
    surname.value === "" ||
    team.value === "" ||
    game.value === "" ||
    role.value === "" ||
    nationality.value === ""
  ) {
    // Pour l'instant on aura juste une alerte du navigateur
    // et pas d'affichage dans le dom
    alert("Veuillez remplir tous les champs avant de valider");
    return;
  } else {
    // Si tout est bon alors on exécute la fonction

    // On fait le fetch vers le lient que l'on a définit
    // Avec les options juste au dessus
    fetch(url, options)
      .then((response) => {
        // En cas de réussite on récupère la réponse en json
        if (response.ok) {
          return response.json();
        } else {
          // En cas d'erreur on lance une erreur
          throw new Error("Erreur le joueur n a pas pu être créer");
        }
      })
      .then((data) => {
        addOneRow(data.Player);

        // On reset les champs une fois que c'est fait
        name.value = "";
        surname.value = "";
        team.value = "";
        game.value = "";
        role.value = "";
        nationality.value = "";
        // Plus tard on appelera la fonction qui ajoute le joueur à la liste affichée
        //   Il faut aussi rajouter un message de confirmation dans le dom
      })
      .catch((error) => {
        console.log("Il y a eu une erreur : ", error);
      });
  }
}

let button = document.querySelector("#addNewPlayer");
button.addEventListener("click", addPlayer);
