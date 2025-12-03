// On va importer Express avec require pour pouvoir l'utiliser
const express = require('express');
// On définit notre application avec express()
const app = express();
// Définition du port que l'on va écouter (on peut le changer directement ici si besoin)
const PORT = 3000;

// On va écouter les requêtes sur le port défini
app.listen(PORT, () => {
    console.log('On ecoute le port 3000 !');
})

// Quand on a une requete au début de la racin '/', on renvoie le fichier de base
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    // __dirnam permet d'obtenir automatique l'arborescence du dossier courant
})

// On va avec app.use définir quel fichier on affiche quand on va sur une requête particulière
// express.static permet de définir un dossier statique qui n'est pas une route serveur
// app.use('/public', express.static('./client/public'));
// app.use('/script', express.static('./client/script'));

// app.get('/liste', (req, res) => {
//     res.send(Liste);
// })