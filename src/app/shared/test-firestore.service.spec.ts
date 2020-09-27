import { TestBed } from '@angular/core/testing';

import { TestFirestoreService } from './test-firestore.service';

import { assertFails, assertSucceeds } from '@firebase/testing';

import { AngularFirestoreModule, AngularFirestore, SETTINGS } from '@angular/fire/firestore';
import { AngularFireModule, FIREBASE_APP_NAME, FIREBASE_OPTIONS, FirebaseApp } from '@angular/fire';
import * as firebase from '@firebase/testing';

import * as fs from 'fs';

const projectId = `rules-spec-${Date.now()}`;
const COMMON_CONFIG = {
  projectId,
  auth: { uid: 'test', email: 'test@example.com' }
};

describe('TestFirestoreServiceService', () => {
  let service: TestFirestoreService;
  let app: FirebaseApp;
  let adminApp: FirebaseApp;
  let afs: AngularFirestore;


  beforeAll(() => {
    return new Promise((resolve, reject) => {
      app = firebase.initializeTestApp({ projectId, auth: { uid: 'test', email: 'test@example.com' } });
      adminApp = firebase.initializeAdminApp({ projectId });
      fs.readFile('./firestore.rules', 'utf8', (err, data) => {
        if (err){
          console.error(err);
          reject(err);
        }else{
          firebase.loadFirestoreRules({
            projectId,
            rules: data
          }).then(resolve);
          }
      });
    });
    // service = new TestFirestoreService(new AngularFirestore(app.options,projectId,true,null,));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG, projectId),
        AngularFirestoreModule
      ],
      providers: [
        { provide: FIREBASE_APP_NAME, useValue: projectId },
        { provide: FIREBASE_OPTIONS, useValue: COMMON_CONFIG },
        { provide: SETTINGS, useValue: { host: 'localhost:8080', ssl: false },
        TestFirestoreService }
      ]
    });

    app = TestBed.inject(FirebaseApp);
    afs = TestBed.inject(AngularFirestore);
  });

  it('should be created', () => {
    service = TestBed.inject(TestFirestoreService);
    expect(service).toBeTruthy();
  });

  it('should read items collection from firestore', () => {
    service = TestBed.inject(TestFirestoreService);
    adminApp.firestore().collection('items').add({value: 0}).then((docRef) => {
      //console.log(docRef);
      const subscription = service.data$().subscribe((items) => { items.forEach(item => { expect(item.value).toBe(1); } ); });
      expect(subscription).toBeTruthy();
      });
  });

  afterEach(() => {
    return firebase.clearFirestoreData({ projectId });
  });

  afterAll(() => {
    return Promise.all(firebase.apps().map(firebaseApp => firebaseApp.delete()));
  });
});
