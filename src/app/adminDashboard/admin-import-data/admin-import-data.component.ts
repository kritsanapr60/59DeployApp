import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { Value } from '../../Value';
import { Field } from '../../field';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomValidationService } from '../../services/custom-validation.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { DialogExampleComponent } from 'src/app/form/dialog-example/dialog-example.component';

import * as firebase from 'firebase';
import { FormService } from 'src/app/form/form.service';
import {
  ConfirmDialogModel,
  ConfirmationDialogComponent,
} from 'src/app/form/confirmation-dialog/confirmation-dialog.component';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { SlugifyPipe } from 'src/app/adminDashboard/fill-out-form/slugify.pipe';
import { map, take, debounceTime, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-admin-import-data',
  templateUrl: './admin-import-data.component.html',
  styleUrls: ['./admin-import-data.component.less'],
  providers: [SlugifyPipe],
})
export class AdminImportDataComponent implements OnInit {
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
    private slugifyPipe: SlugifyPipe,
    private route: ActivatedRoute,
    private auth: AuthService,
    private formService: FormService,
    public dialog: MatDialog,
    public router: Router,
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) {
    this.option = this.route.snapshot.paramMap.get('option');
    this.formId = this.route.snapshot.paramMap.get('formID');
  }

  /**
   * version of form
   *
   * @memberof AddFormComponent
   */
  version: number;

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
   * @type {Value} มี label และ Value
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
      max: 90,
    },
    {
      type: 'date',
      icon: 'calendar_today',
      label: 'Date',
      placeholder: 'Date',
      className: 'form-control',
    },
    {
      type: 'datetime-local',
      icon: 'date_range',
      label: 'DateTime',
      placeholder: 'Date Time',
      className: 'form-control',
    },
    {
      type: 'time',
      icon: 'query_builder',
      label: 'Time',
      placeholder: 'HH:mm:ss',
      className: 'form-control',
    },
    {
      type: 'duration',
      icon: 'timelapse',
      label: 'Duration',
      placeholder: 'Date Time',
      className: 'form-control',
    },
    {
      type: 'textarea',
      icon: 'short_text',
      label: 'Textarea',
    },
    {
      type: 'paragraph',
      icon: 'article',
      label: 'Paragraph',
      placeholder: 'Type your text to display here only',
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
    {
      type: 'file',
      icon: 'insert_photo',
      label: 'Upload Image',
      subtype: 'file',
    },
    {
      type: 'meta_tag',
      icon: 'local_offer',
      label: 'Meta Tag',
      subtype: 'metaTag',
      children: [],
    },
    // {
    //   type: 'button',
    //   icon: 'send',
    //   subtype: 'submit',
    //   label: 'Submit'
    // }
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

  mySlug;
  slug = new FormControl('');
  checkSlug: FormGroup;

  /**
   * ข้อมูล option
   *
   * @type {string[]}
   * @memberof CreateFormContentComponent
   */

  name: string[] = [
    'application-name',
    'author',
    'description',
    'generator',
    'keywords',
    'viewport',
  ];
  httpEquiv: string[] = [
    'content-security-policy',
    'content-type',
    'default-style',
    'refresh',
  ];
  property: string[] = [
    'og:url',
    'og:title',
    'og:description',
    'fb:app_id',
    'og:type',
    'og:video',
    'og:video:url',
    'og:video:secure_url',
    'og:video:type',
    'og:video:width',
    'og:video:height',
    'og:image',
    'og:image:url',
    'og:image:secure_url',
    'og:image:type',
    'og:image:width',
    'og:image:height',
    'og:audio',
    'og:audio:secure_url',
    'og:audio:type',
    'og:locale',
    'og:locale:alternate',
    'og:site_name',
    'og:determiner',
  ];

  myForm: FormGroup;
  model: any;
  previousModel;
  /**
   * เก็บข้อมูล input
   *
   * @type {Observable<string[]>[]}
   * @memberof CreateFormContentComponent
   */
  filteredOptions: Observable<string[]>[] = [];
  /**
   * นำข้อมูล uid และ ชื่อผู้ใช้ ใน auth service มาเก็บไว้ในตัวแปร userUid และ nameCreator
   * ถ้า option เป็น editor ให้นำข้อมูลจาก firebase มาเก็บไว้ในตัวแปล name,description,attributes,versions
   *
   * @memberof AddFormComponent
   */
  ngOnInit() {
    // this.checkSlug = this.fb.group({
    //   slug: ['', Validators.required, CustomValidator.checkSlug(this.afs)],
    // });
    console.log('form ID', this.formId, 'option', this.option);
    this.auth.user$.subscribe((user) => {
      this.model = {
        name: 'Form Name',
        creator: user.uid,
        nameCreator: user.displayName,
        attributes: this.modelFields,
        version: 1,
        createDate: '',
      };
    });

    if (this.option === 'add') {
      this.modelFields.push(
        {
          type: 'display_form_name',
          icon: 'text_format',
          label: 'Display form name',
          description: 'Enter your form name',
          placeholder: 'Enter your form name',
          className: 'form-control',
          subtype: 'text',
          regex: '',
          handle: true,
        },
        {
          type: 'shortenURL',
          icon: 'text_format',
          label: 'Shorten URL',
          description: 'Enter your shorten URL',
          placeholder: 'Enter your shorten URL',
          className: 'form-control',
          subtype: 'text',
          regex: '',
          handle: true,
        }
      );
    } else if (this.option === 'edit') {
      const subFormImportData = this.afs
        .collection('FormImportData')
        .doc(this.formId)
        .valueChanges()
        .subscribe(
          (item) => {
            this.savePreviousData(item);
            this.model = item;
            this.version = item['version'];
            this.myForm = this.fb.group({
              items: this.fb.array([]),
            });
            item['attributes'].map((i) => {
              if (i['type'] === 'meta_tag') {
                i['children'].map((child) => {
                  this.addNewItem(child['attribute'], child['value']);
                });
              }
            });
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

  savePreviousData(data) {
    let Data = data;
    this.previousModel = Data;
  }

  /**
   * เพิ่ม form array ครั้งแรก
   *
   * @return {*}
   * @memberof CreateFormContentComponent
   */
  initItems() {
    const formArray = this.fb.array([]);
    formArray.push(
      this.fb.group({
        attribute: 'name',
        value: ['', [Validators.required]],
      })
    );
    return formArray;
  }

  /**
   * เพิ่ม form array
   *
   * @memberof CreateFormContentComponent
   */
  addNewItem(attribute: string, value = '') {
    const controls = this.myForm.controls['items'] as FormArray;
    if (attribute === 'charset' || attribute === 'prefix') {
      const formGroup = this.fb.group({
        attribute,
        content: [''],
      });
      controls.push(formGroup);
    } else {
      const formGroup = this.fb.group({
        attribute,
        value: [value, [Validators.required]],
        content: [''],
      });
      controls.push(formGroup);
      this.ManageNameControl(controls.length - 1, attribute);
    }
    // Build the account Auto Complete values
  }

  /**
   * เพิ่มข้อมูลลงใน array form ตัวที่ i
   *
   * @param {number} index
   * @memberof CreateFormContentComponent
   */
  ManageNameControl(index: number, attribute: string) {
    console.log(this.myForm.get('items').value);
    const arrayControl = this.myForm.get('items') as FormArray;
    this.filteredOptions[index] = arrayControl
      .at(index)
      .get('value')
      .valueChanges.pipe(
        startWith<string>(''),
        map((name) =>
          name ? this._filter(name, attribute) : this[attribute].slice()
        )
      );
  }

  /**
   * ตรวจข้อความ input
   *
   * @private
   * @param {string} name
   * @return {*}  {string[]}
   * @memberof CreateFormContentComponent
   */
  private _filter(name: string, attribute: string): string[] {
    const filterValue = name.toLowerCase();
    console.log(this.myForm.get('items').value);

    return this[attribute].filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  /**
   * แสดงข้อความ
   *
   * @param {*} [user]
   * @return {*}  {(string | undefined)}
   * @memberof CreateFormContentComponent
   */
  displayFn(user?): string | undefined {
    return user ? user : undefined;
  }

  /**
   * ลบ form array ตัวที่ index
   *
   * @param {number} i index ของ form array
   * @memberof CreateFormContentComponent
   */
  removeItem(i: number) {
    const controls = this.myForm.controls['items'] as FormArray;
    controls.removeAt(i);
    // remove from filteredOptions too.
    this.filteredOptions.splice(i, 1);
  }

  get keyWordd() {
    return this.checkSlug.get('slug');
  }

  slugify(event: any) {
    // this.mySlug = this.slugifyPipe.transform(event);
    this.mySlug = this.slugifyPipe.transform(event.target.value);
    //console.log('Slug : ', this.mySlug);
    this.slug.setValue(this.mySlug);
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
        console.log('onDrop +++ ', event.data);
        if (event.data.type === 'meta_tag') {
          this.myForm = this.fb.group({
            items: this.fb.array([]),
          });
        }
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
    this.model.attributes.forEach((element) => {
      if (element.type === 'meta_tag') {
        element.children = this.myForm.get('items').value;
      }
    });
    this.model['createDate'] = firebase.firestore.FieldValue.serverTimestamp();

    if (this.option === 'add') {
      console.log('-----', this.model);
      this.afs.collection('FormImportData').add(this.model);
      this.router.navigate(['/view/showFormImportData']);
    } else if (this.option === 'edit') {
      this.model['editDate'] = firebase.firestore.FieldValue.serverTimestamp();
      this.model['version'] = this.version + 1;
      this.afs.collection('FormImportData').doc(this.formId).set(this.model);
      this.afs
        .collection('FormImportData')
        .doc(this.formId)
        .collection('versions')
        .doc(`${this.version}`)
        .set(this.previousModel);
      this.router.navigate(['/view/showFormImportData']);
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

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
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
}

export class CustomValidator {
  static checkSlug(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const checkSlug = control.value.toLowerCase();

      return afs
        .collection('FormImportData', (ref) =>
          ref.where('NameShortURL', '==', checkSlug)
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
