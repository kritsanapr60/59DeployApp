import { Injectable } from '@angular/core';
import liff from '@line/liff';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import axios from 'axios';
export interface LINEUSERDATA {
  displayName: string;
  email: string;
  pictureUrl: string;
  statusMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class LineloginService {
  userUID: string;
  userData: LINEUSERDATA;
  userForms: Array<object> = [];

  constructor(private http: HttpClient, private afs: AngularFirestore) {}

  ready(liffId: string) {
    return liff.init({ liffId });
  }
  async LineGetToken() {
    const uid = (await liff.getProfile()).userId;
    const name = (await liff.getProfile()).displayName;
    const email = await liff.getDecodedIDToken().email;
    const picture = (await liff.getProfile()).pictureUrl;
    const accessToken = liff.getAccessToken();
    const instance = axios.create({
      baseURL:
        'https://asia-northeast1-incubate-internship-2020.cloudfunctions.net/createCustomToken',
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    instance
      .post('body', {
        access_token: accessToken,
        email,
        name,
        picture,
        id: uid,
      })
      .then(async (response) => {
        console.log( response);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  logOut() {
    liff.logout();
    window.location.reload();
  }
}
