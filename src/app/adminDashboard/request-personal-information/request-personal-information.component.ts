import { Component, OnInit, OnDestroy } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { Value } from "../../Value";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { DialogExampleComponent } from 'src/app/form/dialog-example/dialog-example.component';
import * as firebase from 'firebase';
import {
  ConfirmDialogModel,
  ConfirmationDialogComponent,
} from 'src/app/form/confirmation-dialog/confirmation-dialog.component';
import { Timestamp } from '@firebase/firestore';
import { Subscription } from 'rxjs';
import { Field } from 'src/app/field';

export interface PersonalInformationItem {
  title: string;
  nameCreator: string;
  creator: string;
  version: number;
  attributes: Array<Field>;
  createDate: Timestamp;
}

@Component({
  selector: 'app-request-personal-information',
  templateUrl: './request-personal-information.component.html',
  styleUrls: ['./request-personal-information.component.less'],
})
export class RequestPersonalInformationComponent implements OnInit, OnDestroy {
  /**
   *Creates an instance of AddFormComponent.
   * @param {ActivatedRoute} route
   * @param {AuthService} auth
   * @param {FormService} formService
   * @param {MatDialog} dialog
   * @param {Router} router
   * @memberof AddFormComponent
   */
  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  /**
   * ตัวแปรเก็บ subscribe
   *
   * @private
   * @type {Subscription}
   * @memberof RequestPersonalInformationComponent
   */
  private subscription: Subscription = null;

  /**
   * version of form
   *
   * @type {number}
   * @memberof RequestPersonalInformationComponent
   */
  versions: number;

  /**
   * option add(เพิ่มฟอร์ม)|edit(แก้ไขฟอร์ม)
   *
   * @type {string}
   * @memberof AddFormComponent
   */
  option: string;

  /**
   * document of form
   *
   * @type {string}
   * @memberof AddFormComponent
   */
  formId: string;

  /**
   *
   * ชื่อผู้สร้าง
   * @type {string}
   * @memberof AddFormComponent
   */
  nameCreator: string;
  /**
   *
   * uid ผู้สร้าง
   * @type {string}
   * @memberof AddFormComponent
   */
  userUid: string;

  /**
   *
   * เก็บข้อมูลตัวเลือกใน chkbox , radio button , selection
   * @type {Value} มี label และ value
   * @memberof AddFormComponent
   */
  value: Value = {
    label: '',
    value: '',
  };
  /**
   *
   * เก็บข้อมูลว่า submit รึยัง true=submitted
   * @memberof AddFormComponent
   */
  success = false;

  /**
   *
   * เก็บ field ประเภทข้อมูลในแบบสอบถาม
   * @type {Array<field>}
   * @memberof AddFormComponent
   */
  fieldModels: Array<Field> = [
    {
      type: 'text',
      icon: 'text_format',
      label: 'Text',
      description: 'Enter your name',
      placeholder: 'Enter your name',
      className: 'form-control',
      subtype: 'text',
      regex: '',
      handle: true,
      value: '',
    },
    {
      type: 'email',
      icon: 'email',
      required: true,
      label: 'Email',
      description: 'Enter your email',
      placeholder: 'Enter your email',
      className: 'form-control',
      subtype: 'text',
      regex: '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+).([a-zA-Z]{2,5})$',
      errorText: 'Please enter a valid email',
      handle: true,
      value: '',
    },
    {
      type: 'phone',
      icon: 'phone',
      label: 'Phone',
      description: 'Enter your phone',
      placeholder: 'Enter your phone',
      className: 'form-control',
      subtype: 'text',
      regex: '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
      errorText: 'Please enter a valid phone number',
      handle: true,
      value: '',
    },
    {
      type: 'number',
      label: 'Number',
      icon: 'looks_one',
      description: 'Age',
      placeholder: 'Enter your age',
      className: 'form-control',
      min: 12,
      max: 90,
      value: '20',
    },
    {
      type: 'date',
      icon: 'calendar_today',
      label: 'Date',
      placeholder: 'Date',
      className: 'form-control',
      value: '',
    },
    {
      type: 'datetime-local',
      icon: 'date_range',
      label: 'DateTime',
      placeholder: 'Date Time',
      className: 'form-control',
      value: '',
    },
    {
      type: 'time',
      icon: 'query_builder',
      label: 'Time',
      placeholder: 'HH:mm:ss',
      className: 'form-control',
      value: '',
    },
    {
      type: 'duration',
      icon: 'timelapse',
      label: 'Duration',
      placeholder: 'Date Time',
      className: 'form-control',
      value: '',
    },
    {
      type: 'textarea',
      icon: 'short_text',
      label: 'Textarea',
      value: '',
    },
    {
      type: 'paragraph',
      icon: 'article',
      label: 'Paragraph',
      placeholder: 'Type your text to display here only',
      value: '',
    },
    {
      type: 'checkbox',
      required: true,
      label: 'Checkbox',
      icon: 'check_box',
      description: 'Checkbox',
      inline: true,
      values: [
        {
          label: 'Option 1',
          value: 'option-1',
        },
        {
          label: 'Option 2',
          value: 'option-2',
        },
      ],
    },
    {
      type: 'radio',
      icon: 'radio_button_checked',
      label: 'Radio',
      description: 'Radio boxes',
      values: [
        {
          label: 'Option 1',
          value: 'option-1',
        },
        {
          label: 'Option 2',
          value: 'option-2',
        },
      ],
    },
    {
      type: 'autocomplete',
      icon: 'reorder',
      label: 'Select',
      description: 'Select',
      placeholder: 'Select',
      className: 'form-control',
      values: [
        {
          label: 'Option 1',
          value: 'option-1',
        },
        {
          label: 'Option 2',
          value: 'option-2',
        },
        {
          label: 'Option 3',
          value: 'option-3',
        },
      ],
    },
  ];

  /**
   * เก็บข้อมูลว่าในแบบสอบถามมี field อะไรบ้าง
   *
   * @type {Array<field>}
   * @memberof AddFormComponent
   */
  modelFields: Array<Field> = [];
  /**
   * เก็บรายละเอียดของแบบสอบถาม
   *
   * @type {*}
   * @memberof AddFormComponent
   */
  model: any = {
    name: 'รายการขอข้อมูลจากผู้ใช้',
    creator: this.userUid,
    nameCreator: this.nameCreator,
    attributes: this.modelFields,
    theme: {
      bannerImage: '',
    },
  };
  /**
   *
   * เก็บว่าผู้ใช้ยืนยันหรือไม่ ถ้ายืนยัน true
   * @type {''}
   * @memberof AddFormComponent
   */
  result: '';
  /**
   *
   * เก็บค่าว่ามีการสร้างรึยัง true คือมีแล้ว
   * @memberof AddFormComponent
   */
  report = false;
  /**
   *
   * เก็บค่าว่าในฟอร์มมี field อะไรบ้าง
   * @type {*}
   * @memberof AddFormComponent
   */
  reports: any = [];
  profileAttr: Array<Field>;

  dataEdit: PersonalInformationItem;

  /**
   * นำข้อมูล uid และ ชื่อผู้ใช้ ใน auth service มาเก็บไว้ในตัวแปร userUid และ nameCreator
   * ถ้า option เป็น editor ให้นำข้อมูลจาก firebase มาเก็บไว้ในตัวแปล name,description,attributes,versions
   *
   * @memberof AddFormComponent
   */
  ngOnInit() {
    this.addSubscription(
      this.auth.user$.subscribe((user) => {
        this.nameCreator = user.displayName;
        this.userUid = user.uid;
      })
    );
    this.addSubscription(
      this.afs
        .collection('reqPersonalInformation')
        .doc('PersonalInformationItem')
        .valueChanges()
        .subscribe(
          (item: PersonalInformationItem) => {
            try {
              this.option = 'edit';
              item.attributes.map((att) => {
                this.modelFields.push(att);
              });
              this.versions = item.version;
              this.dataEdit = item;

            } catch {
              this.option = 'add';
              this.modelFields.push(
                {
                  type: 'text',
                  icon: 'text_format',
                  label: 'name',
                  name: 'text-' + new Date().getTime(),
                  description: 'Enter your name',
                  placeholder: 'Enter your name',
                  className: 'form-control',
                  subtype: 'text',
                  regex: '',
                  handle: true,
                  value: '',
                },
                {
                  type: 'email',
                  icon: 'email',
                  label: 'email',
                  name: 'email-' + new Date().getTime(),
                  description: 'Enter your email',
                  placeholder: 'Enter your email',
                  className: 'form-control',
                  subtype: 'text',
                  regex:
                    '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+).([a-zA-Z]{2,5})$',
                  errorText: 'Please enter a valid email',
                  handle: true,
                  value: '',
                }
              );
            }
            this.profileAttr = item.attributes;
          },
          (err) => {
            console.error(err);
          }
        )
    );
  }

  /**
   * จบการทำงาน component จะ unsubscribe
   *
   * @memberof RequestPersonalInformationComponent
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * add subscribe
   *
   * @param {Subscription} subscription
   * @memberof RequestPersonalInformationComponent
   */
  addSubscription(subscription: Subscription) {
    if (this.subscription) {
      this.subscription.add(subscription);
    } else {
      this.subscription = subscription;
    }
  }

  /**
   *
   * แสดง dialog เมื่อเพิ่มข้อมูลลง firestore สำเร็จ
   * @param {string} statusPushData
   * @memberof AddFormComponent
   */
  openDialog(statusPushData: string) {
    this.dialog.open(DialogExampleComponent, { data: statusPushData });
  }

  /**
   * เรียกใช้เมื่อจะลาก item
   *
   * @param {DragEvent} event
   * @memberof AddFormComponent
   */
  onDragStart(event: DragEvent) {
    //console.log('drag started', JSON.stringify(event, null, 2));
  }

  /**
   *
   * แสดงผลเมื่อการลาก item สิ้นสุด
   * @param {DragEvent} event
   * @memberof AddFormComponent
   */
  onDragEnd(event: DragEvent) {
    //console.log('777777', this.modelFields);

    //console.log('drag ended', JSON.stringify(event, null, 2));
  }
  /**
   *
   * เมื่อลาก item ให้ item มีสถานะ DropEffect เป็น copy
   * @param {DragEvent} event
   * @memberof AddFormComponent
   */
  onDraggableCopied(event: DragEvent) {
    //console.log('draggable copied', JSON.stringify(event, null, 2));
  }

  /**
   *
   * เมื่อลาก item ให้ item มีสถานะ DropEffect เป็น link
   * @param {DragEvent} event
   * @memberof AddFormComponent
   */
  onDraggableLinked(event: DragEvent) {
    //console.log('draggable linked', JSON.stringify(event, null, 2));
  }

  /**
   * เมื่อ reorder field จะแทนที่ item ที่ย้ายไปในตำแหน่งที่ index ใน list
   *
   * @param {*} item
   * @param {any[]} list
   * @param {DropEffect} effect
   * @memberof AddFormComponent
   */
  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === 'move') {
      const index = list.indexOf(item);
      //console.log('ondrag', index);
      list.splice(index, 1);
    }
  }

  /**
   *
   * ฟังก์ชั่นเมื่อ drag cancel
   * @param {DragEvent} event
   * @memberof AddFormComponent
   */
  onDragCanceled(event: DragEvent) {
    //console.log('drag cancelled', JSON.stringify(event, null, 2));
  }

  /**
   *
   * เรียกใช้ฟังก์ชั่นเมื่อ item ลากอยู่บน drop zone
   * @param {DragEvent} event
   * @memberof AddFormComponent
   */
  onDragover(event: DragEvent) {
    //console.log('dragover', JSON.stringify(event, null, 2));
  }

  /**
   *
   * เมื่อวาง item ใน drop zone
   * ถ้า dropEffect = copy จะให้ item มีค่า name เป็น data.type + '-' + new Date().getTime()
   * ถ้า index หาค่าไม่ได้ จะให้เป็นค่าความยาว list
   * โดยจะแทรก item ในตำแหน่งที่ index ของ list
   * @param {DndDropEvent} event
   * @param {any[]} [list]
   * @memberof AddFormComponent
   */
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

  /**
   *
   * add label และ value ใน values
   * @param {*} values ตัวแปรที่จะเพิ่มข้อมูลเข้าไป
   * @memberof AddFormComponent
   */
  addValue(values) {
    values.push(this.value);
    this.value = { label: '', value: '' };
  }
  /**
   * ถ้า option เป็น add ให้เพิ่มรายละเอียดแบบสอบถามใน firestore ผ่านฟังก์ชั่น addDataToFireStore
   * ถ้า option เป็น edit ให้อัพเดทรายละเอียดแบบสอบถามใน firestore ผ่านฟังก์ชั่น editDataFire
   * @memberof AddFormComponent
   */
  updateForm() {
    //console.log('update', JSON.stringify(this.model.attributes));
    if (this.option === 'add') {
      this.afs
        .collection('reqPersonalInformation')
        .doc('PersonalInformationItem')
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
          this.router.navigate(['/view']);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (this.option === 'edit') {
      this.afs.collection('reqPersonalInformation')
        .doc('PersonalInformationItem')
        .collection('versions')
        .doc(`${this.versions}`)
        .set(this.dataEdit);
      this.afs
        .collection('reqPersonalInformation')
        .doc('PersonalInformationItem')
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
          this.router.navigate(['/view']);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
  /**
   *
   * กำหนดค่าเริ่มต้นให้ตัวอย่างฟอร์ม
   * @memberof AddFormComponent
   */
  initReport() {
    this.report = true;
    const input = {
      id: this.model._id,
    };
  }

  /**
   *
   * แสดง dialog เพื่อยืนยัน action ลบ field
   * @param {*} i
   * @memberof AddFormComponent
   */
  confirmDialog(i): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    this.addSubscription(
      dialogRef.afterClosed().subscribe(
        (dialogResult) => {
          if (dialogResult) {
            let tmpIdx = this.checkRef(this.model.attributes[i]);
            if (tmpIdx == 0) {
              this.model.attributes.splice(i, 1);
            }
            else {
              this.openDialog(`ไม่สามารถลบได้ เนื่องจากถูกอ้างอิงในฟอร์มอื่น`);
            }

          }
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  /**
   *
   * สลับค่า true<->false
   * @param {*} item
   * @memberof AddFormComponent
   */
  toggleValue(item) {
    item.selected = !item.selected;
  }

  checkRef(field) {
    for (let index = 0; index < this.profileAttr.length; index++) {
      if (this.profileAttr[index].label == field.label) {
        return this.profileAttr[index].ref;
      }
    }
    return 0;
  }
}
