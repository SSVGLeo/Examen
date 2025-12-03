// On créer une fonction addPlayer qui va récupérer les valeurs dans le dom
// Pour les ajouter à la base de données en suivant le Schéma définit

function addPlayer() {
    console.log("Ajout d un joueur demandé");
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
        console.log(data);
        // Plus tard on appelera la fonction qui ajoute le joueur à la liste affichée
      })
      .catch((error) => {
        console.log("Il y a eu une erreur : ", error);
      });
  }
}

let button = document.querySelector("#addNewPlayer");
button.addEventListener("click", addPlayer);