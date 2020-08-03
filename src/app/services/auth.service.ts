import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../models/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        public ngZone: NgZone) {
          this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                // Logged in
              if (user) {
                return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
              } else {
                // Logged out
                return of(null);
              }
            })
          );
         }

        signIn(email: string, password: string) {
          this.afAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
              this.router.navigate(['dashboard']);
              this.setUserData(res.user);
              console.log('You are Successfully logged in!');
            })
          .catch(err => {
            console.log('Something is wrong:', err.message);
          });
        }

        signUp(email, password) {
          return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
              this.sendVerificationMail();
              this.setUserData(result.user);
            }).catch((error) => {
              console.log(error.message);
            });
        }

        async sendVerificationMail() {
          return (await this.afAuth.currentUser).sendEmailVerification()
          .then(() => {
            this.router.navigate(['verify-email-address']);
          });
        }

        forgotPassword(passwordResetEmail) {
          return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
          .then(() => {
            window.alert('Password reset email sent, check your inbox.');
          }).catch((error) => {
            window.alert(error);
          });
        }

        private setUserData(user) {
          const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
          };

          return userRef.set(userData, { merge: true });
        }

        async signOut() {
          await this.afAuth.signOut();
          this.router.navigate(['login']);
        }

}
