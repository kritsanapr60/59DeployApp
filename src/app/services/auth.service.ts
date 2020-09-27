import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Subject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';

import { Md5 } from 'ts-md5/dist/md5';
import { Admin } from './admin';




/**
 *
 * เป็น service firestore เพื่อเพิ่ม แก้ไข ตรวจสอบข้อมูลผู้ใช้
 *
 * @export
 * @class AuthService
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   *
   *
   * @type {Observable<User>}
   * @memberof AuthService
   */
  user$: Observable<User> = null;
  admin$: Subject<boolean>;
  nameAdmin: string;
  UidAdmin: string;

  // /**
  //  *
  //  *
  //  * @type {boolean}
  //  * @memberof AuthService
  //  */
  // admin: boolean;
  /**
   * Creates an instance of AuthService.
   * สร้างฟังก์ชั่น switchMap คอยรับข้อมูล user
   * ถ้ามีผู้ใช้เข้าระบบ จะ return ข้อมูลผู้ใช้ออกไป
   * ถ้าไม่มี return null
   * @param {AngularFireAuth} afAuth
   * @param {AngularFirestore} afs
   * @param {Router} router
   * @memberof AuthService
   * @returns User's data
   */
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.admin$ = new Subject<boolean>();
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // //console.log(this.getHashEmail(user.email));
          (this.afs.doc<Admin>(`AdminList/${this.getHashEmail(user.email)}`).get().toPromise().then((values) => {
            //console.log(values);
            if (values.exists) {
              //console.log('admin');
              this.nameAdmin = user.displayName;
              this.UidAdmin = user.uid;
              this.admin$.next(values.data().admin);
            }
            else {
              //console.log('normal');
              this.admin$.next(false);
            }
          }));
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          this.admin$.next(false);
          return of(null);
        }
      })
    );
  }
  /**
   * สมัครสมาชิกประเภท admin ผ่าน Google Signin
   * @param provider
   * @param credential
   * @returns {User} ข้อมูลผู้ใช้
   */
  async googleSignupAdmin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  /**
   * Login with Google Email and check admin status
   * @param provider
   * @param credential
   * @returns {User} ข้อมูลผู้ใช้
   */
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  /**
   * Logout โดยเรียกใช้งานผ่าน AngularFireAuth.signOut
   */
  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/admin']);
  }

  /**
   * ตรวจสอบว่า Admin หรือไม่ ถ้าใช่ไปที่หน้า title form ถ้าไม่ใช่จะแสดงข้อความ และปุ่ม Log out
   * @param {Md5} md5 แปลง string to hash md5
   * @param {String} hashEmail เก็บ email หลังใส่ hash function
   */
  private checkUserData(user) {
    const md5 = new Md5();
    const hashEmail = md5.appendStr(user.email).end();
    // //console.log(md5.appendStr(user.email).end());
    //console.log(hashEmail);
    this.afs.doc(`AdminList/${hashEmail}`)
      .update({ admin: true })
      .then(() => {
        //console.log('Admin');
        // update successful (document exists)
      })
      .catch((error) => {
        this.updateUserData(user);
        //console.log('คุณไม่มีสิทธิ์');
        //console.log('Error updating user', error); // (document does not exists)
      });

  }

  /**
   * เพิ่ม hash email ใน collection AdminList
   * @param {Md5} md5 แปลง string to hash md5
   */
  private setAdmin(email) {
    const md5 = new Md5();
    this.afs.doc(`AdminList/${md5.appendStr(email).end()}`).set({}, { merge: true });

  }
  private getHashEmail(email) {
    const md5 = new Md5();
    return md5.appendStr(email).end();

  }
  /**
   *
   * เพิ่มข้อมูลผู้ใช้ใน DB Firestore ที่ collection users ที่มี document id เป็น uid
   * และ set status เป็น Admin ให้ผู้ใช้
   * @private
   * @param {firebase.User} user ข้อมูลผู้ใช้จาก firebase.auth
   * @returns Promise โดยจะ resolve เมื่อข้อมูลถูกเขียนลง DB
   * @memberof AuthService
   */
  private updateUserData(user: firebase.User) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    // this.setAdmin(user.email);

    userRef.set(data, { merge: true });
    return (this.router.navigate(['/view']));
  }
}
