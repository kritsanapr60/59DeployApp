// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/**
 * @namespace
 * @property {object}  environment
 * @property {boolean}  environment.production
 * @property {object}  environment.firebaseApp         - ค่า config firebase
 */
export const environment = {
  /** set production to false */
  production: false,
  /**   - ค่า config firebase */
  firebaseApp: {
    apiKey: 'AIzaSyAIqohg5_f_VBJkNydAN_fDcZIU4kexOBM',
    authDomain: 'incubate-internship-2020.firebaseapp.com',
    databaseURL: 'https://incubate-internship-2020.firebaseio.com',
    projectId: 'incubate-internship-2020',
    storageBucket: 'incubate-internship-2020.appspot.com',
    messagingSenderId: '737851649336',
    appId: '1:737851649336:web:8456a2de3d168ac62b25cd',
    measurementId: 'G-H2QLLHPJ7Q'
  },
  liffId: '1654472250-paWlbKYz'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
