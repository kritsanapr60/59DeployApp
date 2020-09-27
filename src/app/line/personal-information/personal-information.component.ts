import { Component, OnInit } from '@angular/core';
import { LineloginService } from 'src/app/services/linelogin.service';
import { LineGetTokensComponent } from '../line-get-tokens/line-get-tokens.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DialogExampleComponent } from 'src/app/form/dialog-example/dialog-example.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Field } from 'src/app/field';

export interface PersonalInformationItem {
  title: string;
  attributes: Array<Field>;
}

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.less'],
})
export class PersonalInformationComponent implements OnInit {
  userData;
  fieldAttributes: Array<Field>;
  myForm: FormGroup;
  edit = 'show';

  constructor(
    private line: LineGetTokensComponent,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({});
    const lineUserDataSub = this.afs
      .collection('LineUser')
      .doc(this.line.userUID)
      .valueChanges()
      .subscribe(
        (item) => {
          this.userData = item;
          //console.log('user Data line', item);
        },
        (err) => {
          //console.log(err);
        },
        () => {
          lineUserDataSub.unsubscribe();
        }
      );
    const PIItemSub = this.afs
      .collection('reqPersonalInformation')
      .doc('PersonalInformationItem')
      .valueChanges()
      .subscribe(
        (item: PersonalInformationItem) => {
          this.fieldAttributes = item.attributes;
          item.attributes.map((att) => {
            if (att.label in this.userData) {
              this.myForm.addControl(
                att.label,
                new FormControl(this.userData[att.label])
              );
            } else {
              this.myForm.addControl(att.label, new FormControl(''));
            }
          });
          //console.log('field att', item);
        },
        (err) => {
          //console.log(err);
        },
        () => {
          PIItemSub.unsubscribe();
        }
      );
  }

  saveData() {
    const addData = this.afs
      .collection('LineUser')
      .doc(this.line.userUID)
      .set(this.myForm.value, { merge: true });
    addData.then(() => {
      //console.log('===', this.myForm.value);
      this.dialog.open(DialogExampleComponent, { data: 'เพิ่มข้อมูลสำเร็จ' });
      this.edit = 'show';
    });
    addData.catch((err) => {
      this.dialog.open(DialogExampleComponent, {
        data: 'เพิ่มข้อมูลไม่สำเร็จ',
      });
      console.error(err);
    });
  }
}
