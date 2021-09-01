import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  create(data: { email: any; password: any; }) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private fbAuth: AngularFireAuth,
    private router: Router) { }

  async login(email: string, password: string) {
    return new Promise((resolve: any) => {
      this.fbAuth.signInWithEmailAndPassword(email, password)
        .then((res: any) => {
          console.log(res);

          console.log(res.user);


          if (res.user) {

            this.router.navigateByUrl('addTutorial')

          }
        })
        .catch(err => {
          console.log('auth Error');

        });
      resolve()
    })
  }


  async signIn(email: string, password: string) {
    return new Promise((resolve: any) => {
      console.log(email);
      
      this.fbAuth.createUserWithEmailAndPassword(email, password)
        .then((res: any) => {
          if (res.user) {
            console.log(res.user.uid);

            resolve(res.user)
            //this.router.navigateByUrl('addTutorial')

          }
        })
        .catch(err => {
          console.log('auth Error');

        });
    })
  }

  isEmailExist(email: string) {
    return new Promise((resolve) => {
      firebase.auth()
        .fetchSignInMethodsForEmail(email).then(providers => {
          resolve(providers)
        })
    })
  }

  createUser(user: any, path: string) {
    var users = firebase.auth().currentUser;
    var name, email, address, uid, email, password;

    if (users != null) {
      name = user.name;
      email = user.email;
      address = user.address;
      password = user.password;
      uid = user.uid;
    }
    // createUser(user: any, path: string) {
    //   return this.fbAuth.createUserWithEmailAndPassword(user.email, user.password)
    //                               .then((res) => { 
    //                                 let id = res.uid;
    //                                 this.teste(id, path);
    //                                 return this.service.save(user, path)
    //                               });
  }
  // get getCurrentUser() {
  //   return firebase.auth().currentUser || null
  // }

  // get currentUserId() {
  //   return firebase.auth().currentUser?.uid || null
  //   //return (firebase.auth().currentUser !== null) ? firebase.auth().currentUser?.uid : null
  // }


}

