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
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  }

  fetch(path, options)
    .then((response) => {
        if(!response.ok) {
            throw new Error ("Erreur HTTP")
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        nom.value = data.name;
        surname.value = data.surname;
        team.value = data.team;
        game.value = data.game;
        role.value = data.role;
        nationality.value = data.nationality;
    })
    .catch((error) => {
        console.log("Erreur lors du fetch du joueur", error);
    })