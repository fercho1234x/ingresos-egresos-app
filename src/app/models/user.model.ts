export class User {

    static fromFireStore( { correo, uid, nomber } ) {
        return new User( uid, nomber, correo );
    }

    constructor(
        public uid: string,
        public nomber: string,
        public correo: string,
    ) {}
}
