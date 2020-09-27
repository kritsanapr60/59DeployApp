import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormBuilder, AbstractControl } from '@angular/forms';
// import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { DialogExampleComponent } from 'src/app/form/dialog-example/dialog-example.component';
import { map, take, debounceTime, startWith, finalize } from 'rxjs/operators';
import * as firebase from 'firebase';
import { FormService } from 'src/app/form/form.service';
import {
  ConfirmDialogModel,
  ConfirmationDialogComponent,
} from 'src/app/form/confirmation-dialog/confirmation-dialog.component';
import { Timestamp } from '@firebase/firestore';
import { Location } from '@angular/common';
import { Field } from 'src/app/field';
import { FillOutForm } from 'src/app/form/fill-out-form';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { SlugifyPipe } from 'src/app/adminDashboard/fill-out-form/slugify.pipe';

@Component({
  selector: 'app-fill-out-form',
  templateUrl: './fill-out-form.component.html',
  styleUrls: ['./fill-out-form.component.less'],
  providers: [SlugifyPipe],
})
export class FillOutFormComponent implements OnInit {
  option: string;
  formDataId: string;

  model;

  formId: string;
  version: number;
  oldVersion: number;
  userUid: string;
  docForms;
  idOfForm: string;
  downloadURL: string;
  uploadPercentage$: Observable<number>;

  myForm = this.fb.group({});
  image: any;
  path: string;
  nameShortURL: string;

  formItem;
  DataFillOutForm;

  loadingForm = false;
  versionForm: number;
  userDisplayName: string;
  previousData;
  titleForm: string;
  imageURL: string;


  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private formService: FormService,
    public dialog: MatDialog,
    public router: Router,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private location: Location,
    private storage: AngularFireStorage,
    private slugifyPipe: SlugifyPipe
  ) {
    const paraMap = this.route.snapshot.paramMap;
    this.option = paraMap.get('option');
    this.formId = paraMap.get('formID');
    this.formDataId = paraMap.get('formDataID');
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.userUid = user.uid;
      this.userDisplayName = user.displayName;
    });
    if (this.option === 'add') {
      const subFormImportData = this.afs
        .collection('FormImportData')
        .doc(this.formId)
        .valueChanges()
        .subscribe(
          (item: FillOutForm) => {
            this.model = item;
            item.attributes.map((i) => {
              if (i.type === 'meta_tag') {
                i.children.map((child) => {
                  if (child['value']) {
                    this.myForm.addControl(child['value'], new FormControl(''));
                  } else {
                    this.myForm.addControl(
                      child['attribute'],
                      new FormControl('')
                    );
                  }
                });
              } else {
                this.myForm.addControl(i.label, new FormControl(''));
              }
            });
            this.myForm.addControl('AltText', new FormControl(''));
            this.loadingForm = true;
            this.versionForm = item.version;
            this.titleForm = item.name;
            console.log(this.auth.nameAdmin, this.auth.UidAdmin, item.version);
          },
          (err) => {
            console.error(err);
          },
          () => {
            subFormImportData.unsubscribe();
          }
        );
    } else if (this.option === 'edit') {
      let fillOutFormData;
      this.afs
        .collection('FillOutForm')
        .doc(this.formDataId)
        .valueChanges()
        .subscribe((formData) => {
          fillOutFormData = formData;
          this.savePreviousData(formData);
          this.version = formData['version'];
          this.nameShortURL = formData['Shorten URL'];
          this.imageURL = formData['Upload Image'];
        });
      const subFormImportData = this.afs
        .collection('FormImportData')
        .doc(this.formId)
        .valueChanges()
        .subscribe(
          (item: FillOutForm) => {
            this.model = item;
            this.myForm.value['version'] = item.version;
            item.attributes.map((i) => {
              if (i.type === 'meta_tag') {
                i.children.map((child) => {
                  if (child['value']) {
                    this.myForm.addControl(
                      child['value'],
                      new FormControl(fillOutFormData[child['value']])
                    );
                  } else {
                    this.myForm.addControl(
                      child['attribute'],
                      new FormControl(fillOutFormData[child['attribute']])
                    );
                  }
                });
              } else {
                this.myForm.addControl(
                  i.label,
                  new FormControl(fillOutFormData[i.label])
                );
              }
            });
            this.loadingForm = true;
            console.log('fillOutFormData', fillOutFormData);
            this.versionForm = item.version;
            this.titleForm = item.name;
            this.myForm.addControl(
              'AltText',
              new FormControl(fillOutFormData['AltText'])
            );
          },
          (err) => {
            console.error(err);
          },
          () => {
            subFormImportData.unsubscribe();
          }
        );
    }
    else if (this.option === 'read') {
      let fillOutFormData;
      this.afs
        .collection('FillOutForm')
        .doc(this.formDataId)
        .valueChanges()
        .subscribe((formData) => {
          this.previousData = formData;
          fillOutFormData = formData;
          this.version = formData['version'];
          this.nameShortURL = formData['Shorten URL'];
        });
      const subFormImportData = this.afs
        .collection('FormImportData')
        .doc(this.formId)
        .valueChanges()
        .subscribe(
          (item: FillOutForm) => {
            this.model = item;
            this.myForm.value['version'] = item.version;
            item.attributes.map((i) => {
              if (i.type === 'meta_tag') {
                i.children.map((child) => {
                  if (child['value']) {
                    this.myForm.addControl(
                      child['value'],
                      new FormControl(fillOutFormData[child['value']])
                    );
                  } else {
                    this.myForm.addControl(
                      child['attribute'],
                      new FormControl(fillOutFormData[child['attribute']])
                    );
                  }
                });
              } else {
                this.myForm.addControl(
                  i.label,
                  new FormControl(fillOutFormData[i.label])
                );
              }
            });
            this.loadingForm = true;
            console.log('fillOutFormData', fillOutFormData);
            this.versionForm = item.version;
            this.titleForm = item.name;
            this.myForm.addControl(
              'AltText',
              new FormControl(fillOutFormData['AltText'])
            );
          },
          (err) => {
            console.error(err);
          },
          () => {
            subFormImportData.unsubscribe();
          }
        );
    }
  }

  getDocumentForm() {
    this.docForms = this.afs
      .collection('FillOutForm')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  backClicked() {
    this.location.back();
  }

  savePreviousData(data) {
    let Data = data;
    this.previousData = Data;
  }

  onFileUpload(images: FileList) {
    this.image = images[0];
    this.path = `FlexMessage/${images[0].name}`;
  }

  uploadImageToStorage(option: string) {
    this.storage.upload(this.path, this.image);
    this.uploadPercentage$ = this.storage
      .upload(this.path, this.image)
      .percentageChanges();
    const ref = this.storage.ref(this.path);
    const task = this.storage.upload(this.path, this.image);

    task
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          const downloadURL = await ref.getDownloadURL().toPromise();
          this.myForm.value['Upload Image'] = downloadURL;
          console.log('dowloadURL ', downloadURL);
          if (option === 'add') {
            this.myForm.value['version'] = 1;
            // new Date().getTime()
            this.afs
              .collection('FillOutForm')
              .doc(this.formId + '_' + this.userUid)
              .set(this.myForm.value);
          } else if (option === 'edit') {
            this.myForm.value['editDate'] = firebase.firestore.FieldValue.serverTimestamp();
            this.myForm.value['version'] = this.version + 1;
            this.afs
              .collection('FillOutForm')
              .doc(this.formDataId)
              .set(this.myForm.value);
            this.afs
              .collection('FillOutForm')
              .doc(this.formDataId)
              .collection('versions')
              .doc(`${this.version}`)
              .set(this.previousData);
          }
          // this.router.navigate(['/view/viewDetailFormImport', {'formID': this.formDataId}]);
          this.router.navigate(['/view/showFormImportData']);
        })
      )
      .subscribe();
  }

  slugify(value: string) {
    this.nameShortURL = this.slugifyPipe.transform(value);
  }

  saveForm() {
    this.myForm.value['titleForm'] = this.titleForm;
    this.myForm.value['versionForm'] = this.versionForm;
    this.myForm.value['nameCreator'] = this.userDisplayName;
    this.myForm.value['creator'] = this.userUid;
    this.myForm.value['formID'] = this.formId;
    this.myForm.value['titleForm'] = this.titleForm;
    this.myForm.value['Date'] = firebase.firestore.FieldValue.serverTimestamp();
    if (this.option === 'add') {
      this.myForm.value['version'] = 1;
      if (this.image) {
        this.uploadImageToStorage('add');
      } else {
        // new Date().getTime()
        this.afs
          .collection('FillOutForm')
          .doc(this.formId + '_' + this.userUid)
          .set(this.myForm.value);
        this.router.navigate(['/view/showFormImportData']);
      }
    } else if (this.option === 'edit') {
      this.myForm.value['editDate'] = firebase.firestore.FieldValue.serverTimestamp();
      this.myForm.value['version'] = this.version + 1;
      if (this.image) {
        this.uploadImageToStorage('edit');
      } else {
        this.myForm.value['Upload Image'] = this.imageURL;
        this.afs
          .collection('FillOutForm')
          .doc(this.formDataId)
          .set(this.myForm.value);
        this.afs
          .collection('FillOutForm')
          .doc(this.formDataId)
          .collection('versions')
          .doc(`${this.version}`)
          .set(this.previousData);
        this.router.navigate(['/view/showFormImportData']);
      }
    }
    console.log(this.myForm.value);
    console.log(this.image, this.path);
  }
}

export class CustomValidator {
  static checkSlug(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const checkSlug = control.value.toLowerCase();

      return afs
        .collection('FillOutForm', (ref) =>
          ref.where('Shorten URL', '==', checkSlug)
        )
        .valueChanges()
        .pipe(
          debounceTime(500),
          take(1),
          map((arr) => (arr.length ? { slug: false } : null))
        );
    };
  }
}
