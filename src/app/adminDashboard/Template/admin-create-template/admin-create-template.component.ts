import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/field';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Value } from '../../../Value';
import {
  ConfirmDialogModel,
  ConfirmationDialogComponent,
} from 'src/app/form/confirmation-dialog/confirmation-dialog.component';
import { DialogExampleComponent } from 'src/app/form/dialog-example/dialog-example.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Timestamp } from '@firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/form/form.service';
import { map } from 'rxjs/operators';
import { TemplateService } from 'src/app/services/template.service';

export interface AdminTemplateFormationItem {
  title: string;
  nameCreator: string;
  creator: string;
  version: number;
  attributes: Array<Field>;
  createDate: Timestamp;
}
interface TemplateForm {
  name: string;
  creator: string;
  createDate: Timestamp;
  nameCreator: string;
  attributes: Array<Field>;
  version: number;
}

@Component({
  selector: 'app-admin-create-template',
  templateUrl: './admin-create-template.component.html',
  styleUrls: ['./admin-create-template.component.less']
})
export class AdminCreateTemplateComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private afs: AngularFirestore,
    private router: Router,
    private template: TemplateService
  ) {
    const paraMap = this.route.snapshot.paramMap;
    this.option = paraMap.get('option');
    this.formId = paraMap.get('formID');
    console.log('option', this.option);
    console.log('formID', this.formId);

    // this.option = this.route.snapshot.paramMap.get('option');
    // console.log(this.option);

  }

  private subscription: Subscription = null;
  formId: string;
  formDataId: string;
  nameCreator: string;
  userUid: string;
  modelFields: Array<Field> = [];
  dataEdit: AdminTemplateFormationItem;
  option: string;

  versions: number;
  report = false;
  success = false;

  profileAttr: Array<Field>;

  value: Value = {
    label: '',
    value: '',
  };

  // model: any = {
  //   name: 'รายการขอข้อมูลจากผู้ใช้',
  //   creator: this.userUid,
  //   nameCreator: this.nameCreator,
  //   attributes: this.modelFields,
  //   theme: {
  //     bannerImage: '',
  //   },
  // };
  model: any = {
    name: 'Template',
    creator: this.userUid,
    nameCreator: this.nameCreator,
    attributes: this.modelFields,
    theme: {
      bannerImage: '',
    },
  };

  fieldModels: Array<Field> = [
    {
      type: 'text',
      icon: 'title',
      label: 'Title',
      // description: 'Enter your name',
      // placeholder: 'Enter your name',
      // className: 'form-control',
      // subtype: 'text',
      // regex: '',
      // handle: true,
      value: '',
    },
    {
      type: 'text',
      icon: 'photo',
      label: 'ImageUrl',
      // description: 'Enter your name',
      // placeholder: 'Enter your name',
      // className: 'form-control',
      // subtype: 'text',
      // regex: '',
      // handle: true,
      value: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    {
      type: 'datetime-local',
      icon: 'access_time',
      label: 'DateTime',
      placeholder: 'Date Time',
      className: 'form-control',
      value: '',
    }
  ];
  reports: any = [];
  Data;
  TemplateAttr: Array<Field>;
  id = [];
  ngOnInit() {
    // this.afs.collection('FormImportData')
    //   .snapshotChanges()
    //   .forEach(items => {
    //     items.map((a) => {
    //       this.id.push(a.payload.doc.id);
    //       // console.log(a.payload.doc.id);
    //     });
    //   });
    const ProfileSub = this.afs.collection('FormImportData')
      .doc(this.formId)
      .valueChanges()
      .subscribe((item: TemplateForm) => {
        this.TemplateAttr = item.attributes;
        console.log(this.TemplateAttr);

        item.attributes.map((att) => {
          att.readOnly = true;
          // console.log('check att ref ', att.ref);

          if (!att.ref) {
            att.ref = 0;
          }

          // console.log(att);
        });
        console.log('Field att', item);
      },
        (err) => {
          console.log(err);
        },
        () => {
          ProfileSub.unsubscribe();
        }
      );

    this.auth.user$.subscribe((user) => {
      this.nameCreator = user.displayName;
      this.userUid = user.uid;
    });

    this.addSubscription(
      this.afs
        .collection('FormImportData')
        .doc(this.formId)
        .collection('Template')
        .doc('CardTemplate')
        .valueChanges()
        .subscribe(
          (item: AdminTemplateFormationItem) => {
            try {
              this.option = 'edit';
              item.attributes.map((att) => {
                this.modelFields.push(att);
              });
              this.versions = item.version;
              this.dataEdit = item;

            } catch {
              this.option = 'add';
              // this.modelFields.push(
              //   {
              //     type: 'text',
              //     icon: 'text_format',
              //     label: 'name',
              //     name: 'text-' + new Date().getTime(),
              //     description: 'Enter your name',
              //     placeholder: 'Enter your name',
              //     className: 'form-control',
              //     subtype: 'text',
              //     regex: '',
              //     handle: true,
              //     value: '',

              //   },
              //   {
              //     type: 'email',
              //     icon: 'email',
              //     label: 'email',
              //     name: 'email-' + new Date().getTime(),
              //     description: 'Enter your email',
              //     placeholder: 'Enter your email',
              //     className: 'form-control',
              //     subtype: 'text',
              //     regex:
              //       '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+).([a-zA-Z]{2,5})$',
              //     errorText: 'Please enter a valid email',
              //     handle: true,
              //     value: '',
              //   }
              // );
            }
            this.profileAttr = item.attributes;

          },
          (err) => {
            console.error(err);
          }
        )
    );
  }
  updateForm() {
    if (this.option === 'add') {
      this.afs
        .collection('FormImportData')
        .doc(this.formId)
        .collection('Template')
        .doc('CardTemplate')
        .set({
          title: this.model.name,
          creator: this.userUid,
          nameCreator: this.nameCreator,
          attributes: this.model.attributes,
          createDate: firebase.firestore.FieldValue.serverTimestamp(),
          version: 1,
        })
        .then(() => {
          this.openDialog('เพิ่มข้อมูลสำเร็จ');
          this.router.navigate(['/view/viewContent']);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (this.option === 'edit') {
      this.afs.collection('FormImportData')
        .doc(this.formId)
        .collection('Template')
        .doc('CardTemplate')
        .collection('versions')
        .doc(`${this.versions}`)
        .set(this.dataEdit);
      this.afs
        .collection('FormImportData')
        .doc(this.formId)
        .collection('Template')
        .doc('CardTemplate')
        .set({
          title: this.model.name,
          creator: this.userUid,
          nameCreator: this.nameCreator,
          attributes: this.model.attributes,
          createDate: firebase.firestore.FieldValue.serverTimestamp(),
          version: this.versions + 1,
        })
        .then(() => {
          this.openDialog('แก้ไขข้อมูลสำเร็จ');
          this.router.navigate(['/view/viewContent']);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // if (this.option === 'add') {
    //   this.afs
    //     .collection('AdminTemplate')
    //     .doc('AdminTemplateFormationItem')
    //     .set({
    //       title: this.model.name,
    //       creator: this.userUid,
    //       nameCreator: this.nameCreator,
    //       attributes: this.model.attributes,
    //       createDate: firebase.firestore.FieldValue.serverTimestamp(),
    //       version: 1,
    //     })
    //     .then(() => {
    //       this.openDialog('เพิ่มข้อมูลสำเร็จ');
    //       this.router.navigate(['/view']);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // } else if (this.option === 'edit') {
    //   this.afs.collection('AdminTemplate')
    //     .doc('AdminTemplateFormationItem')
    //     .collection('versions')
    //     .doc(`${this.versions}`)
    //     .set(this.dataEdit);
    //   this.afs
    //     .collection('AdminTemplate')
    //     .doc('AdminTemplateFormationItem')
    //     .set({
    //       title: this.model.name,
    //       creator: this.userUid,
    //       nameCreator: this.nameCreator,
    //       attributes: this.model.attributes,
    //       createDate: firebase.firestore.FieldValue.serverTimestamp(),
    //       version: this.versions + 1,
    //     })
    //     .then(() => {
    //       this.openDialog('แก้ไขข้อมูลสำเร็จ');
    //       this.router.navigate(['/view/viewContent']);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // }
  }

  addValue(values) {
    values.push(this.value);
    this.value = { label: '', value: '' };
  }

  onDragEnd(event: DragEvent) {
  }

  onDragover(event: DragEvent) {
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      if (event.dropEffect === 'copy') {
        event.data.name = event.data.type + '-' + new Date().getTime();
      }
      let index = event.index;
      if (typeof index === 'undefined') {
        index = list.length;
      }
      list.splice(index, 0, event.data);
    }
  }

  onDragCanceled(event: DragEvent) {
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === 'move') {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }
  onDragStart(event: DragEvent) {
  }

  addSubscription(subscription: Subscription) {
    if (this.subscription) {
      this.subscription.add(subscription);
    } else {
      this.subscription = subscription;
    }
  }

  openDialog(statusPushData: string) {
    this.dialog.open(DialogExampleComponent, { data: statusPushData });
  }

  confirmDialog(i): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      const result = dialogResult;
      let tmpIdx = this.checkRef(this.model.attributes[i]);
      // console.log('index ', this.profileAttr[tmpIdx].ref);
      this.profileAttr[tmpIdx].ref--;
      // console.log('index after', this.profileAttr[tmpIdx].ref);
      if (result) {
        this.model.attributes.splice(i, 1);

      }
    });
    // this.addSubscription(
    //   dialogRef.afterClosed().subscribe(
    //     (dialogResult) => {
    //       if (dialogResult) {
    //         const tmpIdx = this.checkRef(this.model.attributes[i]);
    //         if (tmpIdx == 0) {
    //           this.model.attributes.splice(i, 1);
    //         }
    //         else {
    //           this.openDialog(`ไม่สามารถลบได้ เนื่องจากถูกอ้างอิงในฟอร์มอื่น`);
    //         }

    //       }
    //     },
    //     (err) => {
    //       console.error(err);
    //     }
    //   )
    // );
  }
  checkRef(field) {
    for (let index = 0; index < this.profileAttr.length; index++) {
      if (this.profileAttr[index].label == field.label) {
        // return this.profileAttr[index].ref;
        return index;
      }
      return 0;
    }
  }

}
