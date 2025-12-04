// ------------------- Connection à la db avec mongodb -----------------------

// On va importer MongoDB avec require pour pouvoir se connecter à la base de données de l'éxamen
// const { MongoClient, ServerApiVersion } = require('mongodb');
// Dans la variable uri on renseigne le lien de connexion à la base de données avec le username et le userpassword (pacomesuperbg)
// const uri = "mongodb+srv://troupleo_db_user2:pacomesuperbg@dbexamen0312.9ab96p0.mongodb.net/?appName=DBExamen0312";

// Le code fournit par MongoAtlas pour se connecter à la BDD, en gros on fait un "client" qui se connecte avec le lien URI
// Et on va faire une fonction asynchrone qui va se connecter à la BDD et qui envoie un message dans la console si ça a bien marché

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     // Changement du message pour quelque chose de plus parlant
//     console.log("Connexion réussit, Pacome est bien Super BG !");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// ------------------- Connection à la db avec mongodb -----------------------

// Dans le cours on utilise mongoose plutot que mongodb directement
// je vais donc faire le code pour mongoose comme dans le cours même si c'est sensiblement la même chose
const mongoose = require("mongoose");
const uri2 =
  "mongodb+srv://troupleo_db_user2:pacomesuperbg@dbexamen0312.9ab96p0.mongodb.net/?appName=DBExamen0312";

// On va importer le modèle Player pour pouvoir l'utiliser
const Player = require("./models/player");

// On va importer Express avec require pour pouvoir l'utiliser
const express = require("express");
// On définit notre application avec express()
const app = express();
// Définition du port que l'on va écouter (on peut le changer directement ici si besoin)
const PORT = 3000;

app.use(express.json());

// let promise = mongoose.connect(uri2, {useNewUrlParser: true});
let promise = mongoose.connect(uri2);

promise.then(() => {
  console.log("Base de données bien connectée avec mongoose");
});
// On va écouter les requêtes sur le port défini
app.listen(PORT, () => {
  console.log("On ecoute le port 3000 !");
});

// Quand on a une requete au début de la racin '/', on renvoie le fichier de base
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // __dirnam permet d'obtenir automatique l'arborescence du dossier courant
});

// On va avec app.use définir quel fichier on affiche quand on va sur une requête particulière
// express.static permet de définir un dossier statique qui n'est pas une route serveur
app.use("/pages", express.static("./pages"));

app.use("/script", express.static("./script"));

app.use("/class", express.static("./class"));

// On définit la route et les actions à faire quand on va vouloir faire
// Un post d'une donnée dans le BDD
app.post("/addPlayer", async (req, res) => {
  try {
    console.log(req.body);

    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.status(201).json({
      message: "Joueur ajouté avec succès",
      Player: newPlayer,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du joueur :", error);
    res.status(500).send("Erreur lors de l'ajout du joueur");
  }
});

// Route qui va être utilisé pour obtenir tous les players de la BDD
app.get("/getPlayers", async (req, res) => {
  Player.find({})
    .then((object) => {
      return res.send(object);
    })
    .catch((error) => {
      console.log("Erreur :", error);
      return res.status(500);
    });
});

// Cette version est déprécié et quand on ouvre la route du get
// On a une page avec des erreurs qui indique :
// MongooseError: Model.findOne() no longer accepts a callback

// app.get("/getPlayers/:id", (req, res) => {
//     Player.findOne( {_id: req.params.id}, (err, obj) => {
//         if(err) {
//             console.log(err);
//             return res.status(500).send("Erreur serveur");
//         }
//         if(!obj) {
//             return res.status(404).send("Joueur non trouvé");
//         }
//         res.send(obj);
//     })
// })

// Route qui va être utilisé pour aller récupérer
// Un seul player depuis la bdd avec son id précis
app.get("/getPlayers/:id", async (req, res) => {
  try {
    const obj = await Player.findById(req.params.id);
    if (!obj) {
      return res.status(404).send("Joueur non trouvé");
    }
    res.json(obj);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// Route qui permet de modifier les informations d'un joueur
// Si j'ai le temps il faudrait ajouter une verif de quels champs
// Sont modifiés
app.put("/updatePlayer/:id", async (req, res) => {
  Player.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true,
  })
  .then((object) => {
    return res.send(object);
  })
  .catch((error) => {
    console.log('Error :', error);
    return res.status(500);
  })
});

module.exports = app;
