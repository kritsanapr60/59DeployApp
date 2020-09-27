import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { Value } from "../../Value";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomValidationService } from '../../services/custom-validation.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import * as firebase from 'firebase';
import { ConfirmDialogModel, ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { FormService } from '../form.service';
import { Field } from 'src/app/field';

export interface PersonalInformationItem {
  title: string;
  attributes: Array<Field>;
}
/**
 *
 * สร้าง form เพิ่มแบบ drag and drop
 * @export
 * @class AddFormComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.less']
})

export class AddFormComponent implements OnInit {

  /**
   * Creates an instance of AddFormComponent.
   * @param {ActivatedRoute} route
   * @param {AuthService} auth
   * @param {FormService} formService
   * @param {MatDialog} dialog
   * @param {Router} router
   * @memberof AddFormComponent
   */
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private formService: FormService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.route.params.subscribe(data => {
      if (data.id === 'add') {
        this.option = 'add';
      } else {
        this.option = 'edit';
        this.formId = data.id;
      }
    });
  }

  /**
   * version of form
   *
   * @memberof AddFormComponent
   */
  versions = 1;


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
   * @type {value} มี label และ value
   * @memberof AddFormComponent
   */
  value: Value = {
    label: '',
    value: ''
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
      handle: true
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
      regex: '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$',
      errorText: 'Please enter a valid email',
      handle: true
    },
    {
      type: 'phone',
      icon: 'phone',
      label: 'Phone',
      description: 'Enter your phone',
      placeholder: 'Enter your phone',
      className: 'form-control',
      subtype: 'text',
      regex: '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$',
      errorText: 'Please enter a valid phone number',
      handle: true
    },
    {
      type: 'number',
      label: 'Number',
      icon: 'looks_one',
      description: 'Age',
      placeholder: 'Enter your age',
      className: 'form-control',
      value: '20',
      min: 12,
      max: 90
    },
    {
      type: 'date',
      icon: 'calendar_today',
      label: 'Date',
      placeholder: 'Date',
      className: 'form-control'
    },
    {
      type: 'datetime-local',
      icon: 'date_range',
      label: 'DateTime',
      placeholder: 'Date Time',
      className: 'form-control'
    },
    {
      type: 'time',
      icon: 'query_builder',
      label: 'Time',
      placeholder: 'HH:mm:ss',
      className: 'form-control'
    },
    {
      type: 'duration',
      icon: 'timelapse',
      label: 'Duration',
      placeholder: 'Date Time',
      className: 'form-control'
    },
    {
      type: 'textarea',
      icon: 'short_text',
      label: 'Textarea'
    },
    {
      type: 'paragraph',
      icon: 'article',
      label: 'Paragraph',
      placeholder: 'Type your text to display here only'
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
          value: 'option-1'
        },
        {
          label: 'Option 2',
          value: 'option-2'
        }
      ]
    },
    {
      type: 'radio',
      icon: 'radio_button_checked',
      label: 'Radio',
      description: 'Radio boxes',
      values: [
        {
          label: 'Option 1',
          value: 'option-1'
        },
        {
          label: 'Option 2',
          value: 'option-2'
        }
      ]
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
          value: 'option-1'
        },
        {
          label: 'Option 2',
          value: 'option-2'
        },
        {
          label: 'Option 3',
          value: 'option-3'
        }
      ]
    },
    // {
    //   type: 'file',
    //   icon: 'fa-file',
    //   label: 'File Upload',
    //   className: 'form-control',
    //   subtype: 'file'
    // },
    // {
    //   type: 'button',
    //   icon: 'send',
    //   subtype: 'submit',
    //   label: 'Submit'
    // }
  ];

  /**
   * เก็บข้อมูลว่าในแบบสอบถามมี Field อะไรบ้าง
   *
   * @type {Array<Field>}
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
    name: 'Form Name',
    description: '',
    creator: this.userUid,
    nameCreator: this.nameCreator,
    theme: {
      bannerImage: ''
    },
    attributes: this.modelFields
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
   * เก็บค่าว่าในฟอร์มมี Field อะไรบ้าง
   * @type {*}
   * @memberof AddFormComponent
   */
  reports = [];
  profileAttr: Array<Field>;



  /**
   * นำข้อมูล uid และ ชื่อผู้ใช้ ใน auth service มาเก็บไว้ในตัวแปร userUid และ nameCreator
   * ถ้า option เป็น editor ให้นำข้อมูลจาก firebase มาเก็บไว้ในตัวแปล name,description,attributes,versions
   * 
   * @memberof AddFormComponent
   */
  ngOnInit() {
    const ProfileSub = this.formService.readProfile()
      .subscribe(
        (item: PersonalInformationItem) => {
          this.profileAttr = item.attributes;
          item.attributes.map((att) => {
            att.readOnly = true;
            //console.log('check att ref ', att.ref);

            if (!att.ref) {
              att.ref = 0;
            }

            //console.log(att);
          });
          //console.log('Field att', item);
        },
        (err) => {
          //console.log(err);
        },
        () => {
          ProfileSub.unsubscribe();
        }
      );
    this.nameCreator = this.auth.nameAdmin;
    this.userUid = this.auth.UidAdmin;

    if (this.option === 'edit') {
      this.formService.readDataDoc(this.formId).subscribe((item) => {
        this.model.name = item.title;
        this.model.description = item.description;
        this.model.attributes = item.attributes;
        this.model.versions = item.versions + 1;
        this.versions = this.model.versions;
        //console.log('version in firestore : ', this.versions);
      });
      this.formService.readDataDoc(this.formId).subscribe((data) => {
        this.formService.addFormVersion(
          this.formId,
          data['title'],
          data['description'],
          data['creator'],
          data['nameCreator'],
          data['attributes'],
          data['versions'],
        );
      });
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
   * เมื่อ reorder Field จะแทนที่ item ที่ย้ายไปในตำแหน่งที่ index ใน list
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
      let tmpIdx = this.checkRef(this.model.attributes[index]);
      //console.log('index ', this.profileAttr[tmpIdx].ref);
      this.profileAttr[tmpIdx].ref++;
      //console.log('index after', this.profileAttr[tmpIdx].ref);
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
    const input = new FormData;
    input.append('id', this.model._id);
    input.append('name', this.model.name);
    input.append('description', this.model.description);
    input.append('bannerImage', this.model.theme.bannerImage);
    input.append('attributes', JSON.stringify(this.model.attributes));
    //console.log(this.model.attributes);
    this.formService.updateReqProfile(this.profileAttr);

    if (this.option === 'add') {
      this.formService.addDataToFireStore(
        this.model.name,
        this.model.description,
        this.userUid,
        this.nameCreator,
        this.model.attributes,
        this.versions
      );
    } else if (this.option === 'edit') {
      this.formService.editDataFire(
        this.formId,
        this.model.name,
        this.model.description,
        this.userUid,
        this.nameCreator,
        this.model.attributes,
        this.versions
      );
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
      id: this.model._id
    };
  }

  /**
   *
   * แสดง dialog เพื่อยืนยัน action ลบ Field
   * @param {*} i
   * @memberof AddFormComponent
   */
  confirmDialog(i): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      let tmpIdx = this.checkRef(this.model.attributes[i]);
      //console.log('index ', this.profileAttr[tmpIdx].ref);
      this.profileAttr[tmpIdx].ref--;
      //console.log('index after', this.profileAttr[tmpIdx].ref);
      if (this.result) {
        this.model.attributes.splice(i, 1);

      }
    });
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

  /**
   *
   * ตรวจสอบว่าเมื่อกดปุ่ม submit ฟอร์ม ผู้ใช้ได้กรอกข้อมูลในแต่ละ Field ถูกต้องตามที่แอดมินกำหนดไว้หรือไม่
   * @returns
   * @memberof AddFormComponent
   */
  submit() {
    let valid = true;
    const validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    validationArray.reverse().forEach(field => {
      //console.log(field.label + '=>' + field.required + '=>' + field.value);
      if (field.required && !field.value && field.type != 'checkbox') {
        Swal.fire('Error', 'Please enter ' + field.label, 'error');
        valid = false;
        return false;
      }
      if (field.required && field.regex) {
        const regex = new RegExp(field.regex);
        if (regex.test(field.value) == false) {
          Swal.fire('Error', field.errorText, 'error');
          valid = false;
          return false;
        }
      }
      if (field.required && field.type == 'checkbox') {
        if (field.values.filter(r => r.selected).length == 0) {
          Swal.fire('Error', 'Please enterrr ' + field.label, 'error');
          valid = false;
          return false;
        }

      }
    });
    if (!valid) {
      return false;
    }
    //console.log('Save', this.model);
    const input = new FormData;
    input.append('formId', this.model._id);
    input.append('attributes', JSON.stringify(this.model.attributes));
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
