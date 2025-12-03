// On va importer MongoDB avec require pour pouvoir se connecter à la base de données de l'éxamen
const { MongoClient, ServerApiVersion } = require('mongodb');
// Dans la variable uri on renseigne le lien de connexion à la base de données avec le username et le userpassword (pacomesuperbg)
const uri = "mongodb+srv://troupleo_db_user2:pacomesuperbg@dbexamen0312.9ab96p0.mongodb.net/?appName=DBExamen0312";

// Le code fournit par MongoAtlas pour se connecter à la BDD, en gros on fait un "client" qui se connecte avec le lien URI
// Et on va faire une fonction asynchrone qui va se connecter à la BDD et qui envoie un message dans la console si ça a bien marché

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    // Changement du message pour quelque chose de plus parlant
    console.log("Connexion réussit, Pacome est bien Super BG !");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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