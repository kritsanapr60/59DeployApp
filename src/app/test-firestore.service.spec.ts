import { TestBed } from '@angular/core/testing';

import { TestFirestoreService } from './test-firestore.service';

import 'jest-extended';
import 'src/matchMedia.mock.ts';

import * as firebaseTest from '@firebase/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';

import * as fs from 'fs';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('TestFirestoreService', () => {
  let service: TestFirestoreService;
  let projectId: string;
  let testApp: firebase.app.App;
  let adminApp: firebase.app.App;
  beforeAll(() => {
    try {
      projectId = 'my-test-project';
      testApp = firebaseTest.initializeTestApp({
        projectId,
        auth: { uid: 'test', email: 'test@example.com' }
      });
      adminApp = firebaseTest.initializeAdminApp({ projectId });
    } catch (err) {
      console.error(err);
    }
  }, 30000);

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SETTINGS,
          useValue: {
            host: process.env.FIRESTORE_EMULATOR_HOST,
            ssl: false
          }
        }
      ],
      imports: [
        AngularFireModule.initializeApp({ projectId }, projectId),
        AngularFirestoreModule
      ],
    });
  });

  it('should be created', () => {
    service = TestBed.inject(TestFirestoreService);
    expect(service).toBeTruthy();
    expect(testApp).toBeTruthy();
    expect(adminApp).toBeTruthy();
  });

  // it('should read firestore', async (done) => {
  //   service = TestBed.inject(TestFirestoreService);
  //   try {
  //     await adminApp.firestore().collection('items').add({ value: true });
  //     expect(service.items).toBeTruthy();
  //     service.items.subscribe((values) => {
  //       expect(values).toEqual(expect.arrayContaining([expect.objectContaining({ value: true })]));
  //       done();
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, 10000);

  it('should be able to set rules', () => {
    return new Promise((resolve, reject) => {
      fs.readFile('firestore.rules', { encoding: 'utf8' }, async (err, rules) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          // //console.log(data);
          expect(rules).toBeTruthy();
          await firebaseTest.loadFirestoreRules({ projectId, rules });
          // tslint:disable-next-line: max-line-length
          const result: firebaseTest.firestore.DocumentSnapshot<firebaseTest.firestore.DocumentData> | firebase.FirebaseError = await firebaseTest.assertFails(testApp.firestore().collection('secret').doc('super-secret-document').get());
          expect((result as firebase.FirebaseError).code).toBe('permission-denied');
          resolve();
        }
      });
    });
  }, 10000);

  afterEach(() => {
    return firebaseTest.clearFirestoreData({ projectId });
  });

  afterAll(async () => {
    return Promise.all(firebaseTest.apps().map(app => app.delete()));
  });
});
