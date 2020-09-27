
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { FormData } from './form-data';
import * as firebase from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { Timestamp } from '@firebase/firestore';
import { PriorityStatus } from '../priority-status.enum';
import { FormImportData } from './form-import-data';
import { FillOutForm } from './fill-out-form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  formCol: AngularFirestoreDocument<FormData>;
  forms: any;

  formImportdataCol: AngularFirestoreDocument<FormImportData>;
  formImports: any;

  fillOutFormCol: AngularFirestoreDocument<FillOutForm>;
  fillOutForm: any;

  runNumber: number;
  lengthDoc: number;

  // Variable  collection of Form
  attribute: string;
  title: string;
  nameCreator: string;
  createDate: Timestamp;
  description: string;
  creator: string;
  oldVersions: number;

  nextVersion: number;
  oldData: any;
  nextVersConst: number;

  // Variable collection of Consent
  consTitle: string;
  consCreator: string;
  constCreateDate: Timestamp;
  consNameCreator: string;
  consAttributes: string;
  oldVersConst: number;

  versionConsent: number;
  getVersionForm: number;
  runNumberVersion: number;
  fieldsForm: Array<Object>;

  constructor(
    private afs: AngularFirestore,
    public dialog: MatDialog,
    public router: Router
  ) { }

  getDatatoFormView() {
    return this.afs.collection('form').valueChanges();
  }
  readDataDoc(idDoc: string) {
    this.formCol = this.afs.doc('form/' + idDoc);
    return this.formCol.valueChanges();
  }

  readConsent(idDoc: string) {
    this.formCol = this.afs.doc('consent/' + idDoc);
    return this.formCol.valueChanges();
  }
  readForm(idDoc: string) {
    this.formCol = this.afs.doc('form/' + idDoc);
    return this.formCol.valueChanges();
  }

  addDataToFireStore(
    title: string,
    description: string,
    creator: string,
    nameCreator: string,
    attributes: Array<Object>,
    versions
  ) {
    try {
      this.afs.collection('form').add({
        title,
        description,
        creator,
        nameCreator,
        createDate: firebase.firestore.FieldValue.serverTimestamp(),
        attributes,
        versions: 1,
      });
      this.openDialog(`เพิ่มข้อมูลสำเร็จ :)`);
      this.router.navigate(['/view']);
    } catch (error) {
      console.log(error);
      this.openDialog(`เพิ่มข้อมูลไม่สำเร็จ :(`);
      // this.router.navigate(['/detailForm']);
    }
  }

  async editDataFire(
    docId: string,
    title: string,
    description: string,
    creator: string,
    nameCreator: string,
    attributes: Array<Object>,
    versions: number
  ) {
    try {
      versions === 2
        ? (this.nextVersion = versions)
        : (this.nextVersion = versions); // Condition
      // this.nextVersion = versions ;   // Condition
      let dataOld: Array<any> = [];
      await this.afs
        .doc('form/' + docId)
        .snapshotChanges()
        .subscribe((item) => {
          // Query Previous Data
          this.title = item['title'];
          this.nameCreator = item['nameCreator'];
          this.createDate = item['createDate'];
          this.description = item['description'];
          this.creator = item['creator'];
          this.attribute = item['attributes'];
          this.oldVersions = item['versions'];
        });

      // Form update latest
      this.afs.doc('form/' + docId).update({
        title,
        description,
        creator,
        nameCreator,
        createDate: firebase.firestore.FieldValue.serverTimestamp(),
        attributes,
        versions: this.nextVersion,
      });

      this.openDialog(`แก้ไขข้อมูลสำเร็จ :)`);
      this.router.navigate(['/view']);
    } catch (error) {
      console.log(error);
      this.openDialog(`แก้ไขข้อมูลไม่สำเร็จ :(`);
      // this.router.navigate(['/detailForm']);
    }
  }

  addFormVersion(
    docId: string,
    title: string,
    description: string,
    creator: string,
    nameCreator: string,
    attributes: Array<Object>,
    versions: number
  ) {
    this.afs
      .collection('form/')
      .doc(docId)
      .collection('versions')
      .doc(`${versions}`)
      .set({
        title,
        creator,
        nameCreator,
        createDate: firebase.firestore.FieldValue.serverTimestamp(),
        attributes,
        versions,
      });
  }


  addConsentToFireStore(
    docId: string,
    title: string,
    creator: string,
    nameCreator: string,
    attributes: Array<Object>
  ) {
    //console.log(attributes);
    try {
      this.afs.doc('consent/' + docId).set({
        title,
        creator,
        nameCreator,
        createDate: firebase.firestore.FieldValue.serverTimestamp(),
        attributes,
        version: 1,
      });
      this.openDialog(`เพิ่มข้อมูลสำเร็จ :)`);
      this.router.navigate(['/view']);
    } catch (error) {
      console.log(error);
      this.openDialog(`เพิ่มข้อมูลไม่สำเร็จ :(`);
      // this.router.navigate(['/detailForm']);
    }
  }

  editConsentToFireStore(
    docId: string,
    title: string,
    creator: string,
    nameCreator: string,
    attributes: Array<Object>,
    versConsent: number
  ) {
    try {
      //console.log('get versions from edit compont', versConsent); // debug the data provided by EditComponent
      versConsent === 2
        ? (this.nextVersConst = versConsent)
        : (this.nextVersConst = versConsent);
      this.afs
        .doc('consent/' + docId)
        .valueChanges()
        .subscribe((itemCons) => {
          // Query Previous Data
          this.consTitle = itemCons['title'];
          this.consCreator = itemCons['creator'];
          this.constCreateDate = itemCons['createDate'];
          this.consNameCreator = itemCons['nameCreator'];
          this.consAttributes = itemCons['attributes'];
          this.oldVersConst = itemCons['versions'];

          //console.log('old version in consent form : ', this.oldVersConst);
        });

      this.afs.doc('consent/' + docId).update({
        title,
        creator,
        nameCreator,
        createDate: firebase.firestore.FieldValue.serverTimestamp(),
        attributes,
        version: this.nextVersConst,
      });

      this.openDialog(`แก้ไขข้อมูลสำเร็จ :)`);
      this.router.navigate(['/view']);
    } catch (error) {
      console.log(error);
      this.openDialog(`แก้ไขข้อมูลไม่สำเร็จ :(`);
      // this.router.navigate(['/detailForm']);
    }
  }

  /**
   * เพิ่ม version ใน subcollection
   *
   * @param {string} docId id document
   * @param {string} title title consent
   * @param {string} creator uid admin
   * @param {string} nameCreator name admin
   * @param {Array<Object>} attributes consent attribute
   * @param {number} versions version number
   * @memberof FormService
   */
  addversion(
    docId: string,
    title: string,
    creator: string,
    nameCreator: string,
    attributes: Array<Object>,
    versions: number
  ) {
    this.afs
      .collection('consent/')
      .doc(docId)
      .collection('versions')
      .doc(`${versions}`)
      .set({
        title,
        creator,
        nameCreator,
        createDate: firebase.firestore.FieldValue.serverTimestamp(),
        attributes,
        versions,
      });
  }

  /**
   * เพิ่มข้อมูลให้ user ที่อ่าน consent
   *
   * @param {string} userUID id user
   * @param {string} consentID id consent
   * @param {Object} attributes attribute consent
   * @param {number} version consent version
   * @param {string} title title consent
   * @memberof FormService
   */
  addUserConsent(
    userUID: string,
    consentID: string,
    attributes: Object,
    version: number,
    title: string
  ) {
    //console.log(userUID, consentID, attributes, version, title);
    this.afs
      .collection('UserForm')
      .doc(userUID)
      .collection('consent')
      .doc(consentID)
      .set({
        attributes,
        Date: firebase.firestore.FieldValue.serverTimestamp(),
        version,
        title,
      });
    this.afs
      .collection('LineUser')
      .doc(userUID)
      .set(
        {
          documentForm: [consentID],
        },
        { merge: true }
      );
  }
  addUserForm(
    userUID: string,
    consentID: string,
    attributes: Object,
    version: number,
    title: string,
    description: string
  ) {
    this.afs
      .collection('UserForm')
      .doc(userUID)
      .collection('form')
      .doc(consentID)
      .set({
        attributes,
        Date: firebase.firestore.FieldValue.serverTimestamp(),
        version,
        title,
        description
      });
    this.afs
      .collection('LineUser')
      .doc(userUID)
      .set(
        {
          documentForm: [consentID],
        },
        { merge: true }
      );
  }

  readUserConsent(userUID: string, consentID: string) {
    return this.afs
      .collection('UserForm')
      .doc(userUID)
      .collection('consent')
      .doc(consentID)
      .valueChanges();
  }
  readUserForm(userUID: string, consentID: string) {
    return this.afs
      .collection('UserForm')
      .doc(userUID)
      .collection('form')
      .doc(consentID)
      .valueChanges();
  }
  editSubUserConsentVersion(
    userUID: string,
    consentID: string,
    title: string,
    attributes: Object,
    version: number
  ) {
    try {
      // Sub Collection Version
      //console.log('editSub', userUID);
      //console.log('editSub', consentID);
      //console.log('editSub', title);
      //console.log('editSub', attributes);
      //console.log('editSub', version);
      this.afs
        .collection('UserForm')
        .doc(userUID)
        .collection('consent')
        .doc(consentID)
        .collection('versions')
        .doc(`${version}`)
        .set({
          title,
          attributes,
          Date: firebase.firestore.FieldValue.serverTimestamp(),
          version: version,
        });
    } catch (err) {
      //console.log(`Error Mass : ${err}`)
    }
  }

  editSubUserFormVersion(
    userUID: string,
    consentID: string,
    title: string,
    attributes: Object,
    version: number
  ) {
    try {
      // Sub Collection Version
      this.afs
        .collection('UserForm')
        .doc(userUID)
        .collection('form')
        .doc(consentID)
        .collection('versions')
        .doc(`${version}`)
        .set({
          title,
          attributes,
          Date: firebase.firestore.FieldValue.serverTimestamp(),
          version,
        });
    } catch (err) { }
  }

  editUserConsent(
    userUID: string,
    consentID: string,
    title: string,
    attributes: Object,
    version: number
  ) {
    try {

      this.getVersionForm = version;
      // Main Collection
      this.afs
        .collection('UserForm')
        .doc(userUID)
        .collection('consent')
        .doc(consentID)
        .update({
          title,
          attributes,
          Date: firebase.firestore.FieldValue.serverTimestamp(),
          version: version + 1,
        });
      this.openDialog(`Success Messages`);
    } catch (err) {
      console.log('Error Message :', err);
      this.openDialog(`Error Messages :${err}`);
    }
  }


  cancelsInformation(
    Uid: string,
    Name: string,
    Request: string,
    Status: string,
    valueSelector: string
  ) {
    //console.log(Uid, Request, Status, valueSelector);
    this.afs.collection('CancelsInformation').add({
      Uid,
      Name,
      Request: Request,
      Status,
      Priority: PriorityStatus.Pending,
      Time: firebase.firestore.FieldValue.serverTimestamp(),
      CancelType: valueSelector
    });
  }

  readProfile() {
    return this.afs
      .collection('reqPersonalInformation')
      .doc('PersonalInformationItem')
      .valueChanges();
  }

  updateReqProfile(attributes) {
    return this.afs
      .collection('reqPersonalInformation')
      .doc('PersonalInformationItem')
      .update({
        attributes
      });
  }

    // *******************  Admin create form for user import data  **********************
    addImportData(
      Name: string,
      FormShortedURL: string,
      DisplayNameData: string,
      NameShortURL: string,
      UserID: string,
      NameCreator: string,
      attributes: Array<Object>,
      version: number
    ) {
      try {
        // this.afs.collection('FormImportData').doc(UserID).set({
        this.afs.collection('FormImportData').add({
          Name,
          FormShortedURL,
          DisplayNameData,
          NameShortURL,
          UserID,
          NameCreator,
          attributes,
          createDate: firebase.firestore.FieldValue.serverTimestamp(),
          version: 1
        }),
        this.router.navigate(['view/showFormImportData']);
        // this.openDialog(`เพิ่มข้อมูลสำเร็จ :)`);
      } catch (error) {
        console.log(error);
        this.openDialog(`เพิ่มข้อมูลไม่สำเร็จ :(`);
        this.router.navigate(['/detailForm']);
      }
    }

    // *******************  Admin read form for user import data  **********************v
    readImportDataDoc() {
      this.formImportdataCol = this.afs.doc('FormImportData');
      return this.formImportdataCol.valueChanges();
    }

    // *******************  Admin get data to form for user import data  **********************v
    getDataToEdit(idDoc: string) {
      this.formImportdataCol = this.afs.doc('FormImportData/' + idDoc);
      return this.formImportdataCol.valueChanges();
    }


    // *******************  Admin edit version form for user import data  **********************
    editVersionFormImport(
      docId: string,
      Name: string,
      FormShortedURL: string,
      DisplayNameData: string,
      NameShortURL: string,
      UserID: string,
      NameCreator: string,
      attributes: Array<Object>,
      version: number
    ) {
      try{
        // //console.log(docId);
        // //console.log(Name);
        // //console.log(FormShortedURL);
        // //console.log(DisplayNameData);
        // //console.log(NameShortURL);
        // //console.log(UserID);
        // //console.log(NameCreator);
        // //console.log(attributes);
        //console.log('Version formService : ', version);

        this.afs.collection('FormImportData').doc(docId).collection('versions').doc(`${version}`).set({
          Name,
          FormShortedURL,
          DisplayNameData,
          NameShortURL,
          UserID,
          NameCreator,
          attributes,
          createDate: firebase.firestore.FieldValue.serverTimestamp(),
          version
        });

      } catch (err) {
        console.error();
      }
    }

    // *******************  Admin edit form for user import data  **********************
    editImportData(
      docId: string,
      Name: string,
      FormShortedURL: string,
      DisplayNameData: string,
      NameShortURL: string,
      UserID: string,
      NameCreator: string,
      attributes: Array<Object>,
      version: number
    ) {
      try {
        this.afs.collection('FormImportData').doc(docId).set({
          Name,
          FormShortedURL,
          DisplayNameData,
          NameShortURL,
          UserID,
          NameCreator,
          attributes,
          createDate: firebase.firestore.FieldValue.serverTimestamp(),
          version
        }),
        this.openDialog(`เพิ่มข้อมูลสำเร็จ :)`);
        this.router.navigate(['/view']);
      } catch (error) {
        console.log(error);
        this.openDialog(`เพิ่มข้อมูลไม่สำเร็จ :(`);
        // this.router.navigate(['/detailForm']);
      }
    }


    // *******************  Fill out a form เรียกข้อมูลฟอร์มมาเเสดง  **********************
    getFormShow(idDoc: string) {
      this.formImportdataCol = this.afs.doc('FormImportData/' + idDoc);
      return this.formImportdataCol.valueChanges();
    }

    // *******************  Fill out a form กรอกฟอร์มเเละบันทึกลงฐานข้อมูล  **********************
    saveForm(
      docId: string,
      Name: string,
      FormShortedURL: string,
      DisplayNameData: string,
      NameShortURL: string,
      UserID: string,
      NameCreator: string,
      attributes: Array<Object>,
    ) {
      try {


        this.afs.collection('FillOutForm').doc(docId + '_' + UserID).set({
          docId,
          Name,
          FormShortedURL,
          DisplayNameData,
          NameShortURL,
          UserID,
          NameCreator,
          attributes,
          version: 1
        });
        this.openDialog(`เพิ่มข้อมูลสำเร็จ :)`);
      } catch (err) {
        console.error(err);
      }
    }

    readFillOutForm(docId: string) {
      this.fillOutFormCol = this.afs.doc('FillOutForm/' + docId);
      return this.fillOutFormCol.valueChanges();
    }

    keepVersionFiilForm(
      docId: string,
      Name: string,
      FormShortedURL: string,
      DisplayNameData: string,
      NameShortURL: string,
      UserID: string,
      NameCreator: string,
      attributes: Array<Object>,
      version: number
      ) {
      try {
        this.afs.collection('FillOutForm').doc(docId + '_' + UserID).collection('version').doc(`${version}`).set({
          docId,
          Name,
          FormShortedURL,
          DisplayNameData,
          NameShortURL,
          UserID,
          NameCreator,
          attributes,
          version
        });
      } catch (err) {
        console.error();
      }
    }

    saveEditForm(
      docId: string,
      Name: string,
      FormShortedURL: string,
      DisplayNameData: string,
      NameShortURL: string,
      UserID: string,
      NameCreator: string,
      attributes: Array<Object>,
      version: number
  ) {
    try {
      this.afs.collection('FillOutForm').doc(docId + '_' + UserID).set({
        docId,
        Name,
        FormShortedURL,
        DisplayNameData,
        NameShortURL,
        UserID,
        NameCreator,
        attributes,
        version
      });
    } catch (err) {
      console.error();
    }
    }

  openDialog(statusPushData: string) {
    this.dialog.open(DialogExampleComponent, { data: statusPushData });
  }
}
