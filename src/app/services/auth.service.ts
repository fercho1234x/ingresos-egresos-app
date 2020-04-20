import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actios';
import { AppStateGlobal } from '../app.reducer';
import { unSetUser } from '../auth/auth.actios';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(
    private store: Store<AppStateGlobal>,
    private auth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {}

  initAuthListener() {

    this.auth.authState.subscribe( fuser => {
      // console.log( fuser.uid );
      if (fuser) {
        this.userSubscription = this.angularFirestore.doc(`${ fuser.uid }/usuario`).valueChanges()
            .subscribe( (fireStoreUser: any) => {
              const user = User.fromFireStore( fireStoreUser );
              this.store.dispatch( authActions.setUser( { user } ) );
            });
      } else {
        this.store.dispatch( unSetUser() );
        this.userSubscription.unsubscribe();
      }
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
