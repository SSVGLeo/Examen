export class Player {
    _name;
    _surname;
    _team;
    _game;
    _role;
    _nationality;

    constructor(id, nom, prenom, equipe, jeu, role, nationalite) {
        this._id = id;
        this._name = nom;
        this._surname = prenom;
        this._team = equipe;
        this._game = jeu;
        this._role = role;
        this._nationality = nationalite;
    }

    get name() {
        return this._name;
    }
    
    set name(tmp) {
        this._name = tmp;
    }

    get surname() {
        return this._surname;
    }
    
    set surname(tmp) {
        this._surname = tmp;
    }

    get team() {
        return this._team;
    }
    
    set team(tmp) {
        this._team = tmp;
    }

    get game() {
        return this._game;
    }
    
    set game(tmp) {
        this._game = tmp;
    }

    get role() {
        return this._role;
    }
    
    set role(tmp) {
        this._role = tmp;
    }

    get nationality() {
        return this._nationality;
    }
    
    set nationality(tmp) {
        this._nationality = tmp;
    }
}