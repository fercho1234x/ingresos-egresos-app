import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

import { map } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {}

  initAuthListener() {

    this.auth.authState.subscribe( fuser => {
      console.log( fuser );
      console.log( fuser.uid );
      console.log( fuser.email );
    });

  }

  crearUsuario( nombre: string, correo: string, password: string ) {
    return this.auth.createUserWithEmailAndPassword( correo, password )
               .then( ({ user }) => {
                  const userNew = new User( user.uid, nombre, correo );
                  return this.angularFirestore.doc(`${ user.uid }/usuario`).set( {...userNew} );
               });
  }

  loginUsuario( correo: string, passwor: string ) {
    return this.auth.signInWithEmailAndPassword( correo, passwor );
  }

  logout() {
    this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null)
    );
  }

}
