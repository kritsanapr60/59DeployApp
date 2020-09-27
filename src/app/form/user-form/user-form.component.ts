import { Component, OnInit } from '@angular/core';
import { Value } from "../../Value";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import * as firebase from 'firebase';
import { FormService } from '../form.service';
import { LineloginService } from 'src/app/services/linelogin.service';
import { PassThrough } from 'stream';
import { Field } from 'src/app/field';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
/**
 *
 * สร้าง form เพิ่มแบบ drag and drop
 * @export
 * @class AddFormComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {


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
    private route: ActivatedRoute,
    private auth: AuthService,
    private afs: AngularFirestore,
    private formService: FormService,
    public dialog: MatDialog,
    public router: Router,
    private line: LineloginService,
    private fb: FormBuilder,
  ) {
    this.route.params.subscribe((data) => {
      this.consentId = data.id;
    });
  }

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
    {
      type: 'button',
      icon: 'send',
      subtype: 'submit',
      label: 'Submit'
    }
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
   * เก็บค่าว่าในฟอร์มมี field อะไรบ้าง
   * @type {*}
   * @memberof AddFormComponent
   */
  reports: any = [];
  consentId: string;
  userData;
  formAttributes: Array<Field>;
  version: number;
  title: string;
  description: string;
  consentAttributes: Object;
  fieldConsent: { [k: string]: any } = {};
  myForm: FormGroup;


  /**
   * นำข้อมูล uid และ ชื่อผู้ใช้ ใน auth service มาเก็บไว้ในตัวแปร userUid และ nameCreator
   * ถ้า option เป็น editor ให้นำข้อมูลจาก firebase มาเก็บไว้ในตัวแปล name,description,attributes,versions
   * 
   * @memberof AddFormComponent
   */
  ngOnInit() {
    this.myForm = this.fb.group({});
    const lineUserDataSub = this.afs
      .collection('LineUser')
      .doc(this.line.userUID)
      .valueChanges()
      .subscribe(
        (item) => {
          this.userData = item;
        },
        (err) => {
          console.log(err);
        },
        () => {
          lineUserDataSub.unsubscribe();
        }
      );
    this.formService.readForm(this.consentId).subscribe((item) => {
      this.title = item.title,
        this.description = item.description,
        this.formAttributes = item.attributes,
        item.attributes.map((att) => {
          if (att.label in this.userData) {
            console.log('have userdata');
            att.value = this.userData[att.label]

            this.myForm.addControl(
              att.label,
              new FormControl(att.value)
            );
          } else {
            att.value='';
            this.myForm.addControl(att.label, new FormControl(att.value));
          }
        }),
        this.version = item['versions']
      this.formAttributes.push({
        type: 'button',
        icon: 'send',
        subtype: 'submit',
        label: 'Submit'
      });
    });
    this.formService
      .readUserConsent(this.line.userUID, this.consentId)
      .subscribe((item) => {
        try {
          this.getFieldAccept(item['attributes']);

        } catch (err) {
          console.log(`Error Massage : ${err}`);
        }
      });
  }

  getFieldAccept(attributes: Object) {
    //console.log('getttttttt');
    for (let i = 0, l = Object.values(attributes).length; i < l; i++) {
      if ('children' in attributes[i]) {
        const obj = attributes[i].children[2].children;
        for (let num of obj) {
          var accept = (attributes[i].value == 'ยอมรับ') ? false : true;
          if (this.fieldConsent[num.label]) {
            if (this.fieldConsent[num.label] == false && accept) {
              this.fieldConsent[num.label] = accept;
            }
          } else {
            this.fieldConsent[num.label] = accept;
          }
        }
      }

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
   * ตรวจสอบว่าเมื่อกดปุ่ม submit ฟอร์ม ผู้ใช้ได้กรอกข้อมูลในแต่ละ field ถูกต้องตามที่แอดมินกำหนดไว้หรือไม่
   * @returns
   * @memberof AddFormComponent
   */
  submit() {
    let valid = true;
    const validationArray = JSON.parse(JSON.stringify(this.formAttributes));

    validationArray.reverse().forEach(field => {
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
    console.log('form', this.line.userUID,
      this.consentId,
      this.formAttributes,
      this.version,
      this.title,
      this.description);
    this.formService.addUserForm(
      this.line.userUID,
      this.consentId,
      this.formAttributes,
      this.version,
      this.title,
      this.description
    );
    return this.router.navigate(['']);


  }

}
