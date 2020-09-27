import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { Value } from "../../Value";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../../form/dialog-example/dialog-example.component';
import {
  ConfirmDialogModel,
  ConfirmationDialogComponent,
} from '../../form/confirmation-dialog/confirmation-dialog.component';
import { FormService } from '../../form/form.service';
import { Field } from 'src/app/field';

@Component({
  selector: 'app-consentform',
  templateUrl: './consentform.component.html',
  styleUrls: ['./consentform.component.less'],
})
export class ConsentformComponent implements OnInit {

  /**
   * Creates an instance of ConsentformComponent.
   * @param {ActivatedRoute} route
   * @param {AuthService} auth
   * @param {FormService} formService
   * @param {MatDialog} dialog
   * @param {Router} router
   * @memberof ConsentformComponent
   */
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private formService: FormService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.route.params.subscribe((data) => {
      this.consentId = data.id;
      this.option = data.option;
    });
  }

  /**
   * document id of consent
   *
   * @type {string}
   * @memberof ConsentformComponent
   */
  consentId: string;

  /**
   * option create|edit create เมื่อไม่มี consent edit เมื่อมี consent
   *
   * @type {string}
   * @memberof ConsentformComponent
   */
  option: string;


  /**
   * version of consent
   *
   * @type {number}
   * @memberof ConsentformComponent
   */
  versConsent: number;
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
      type: 'editor',
      icon: 'text_format',
      subtype: 'editor',
      label: 'free text',
      data: '',
    },
    {
      type: 'session',
      icon: 'featured_play_list',
      subtype: 'session',
      label: 'session',
      description: 'Radio boxes',
      children: [
        {
          type: 'titleSection',
          data: '',
        },
        {
          type: 'editor',
          subtype: 'editor',
          label: 'Description',
          data: 'เพื่อรับบริการ จำเป็นต้องใช้ข้อมูลดังนี้',
        },
        {
          type: 'sessionFields',
          subtype: 'session',
          label: 'session fields',
          description: 'Radio boxes',
          children: [
          ],
        },
        {
          type: 'editor',
          icon: 'text_format',
          subtype: 'editor',
          label: 'List of Service',
          data: 'คุณจะไม่สามารถ',
        },
        {
          type: 'radioSession',
          label: 'radioSession',
          description: 'Radio boxes',
          values: [
            {
              label: 'ยอมรับ',
              value: 'accept',
            },
            {
              label: 'ไม่ยอมรับ',
              value: 'notAccept',
            },
          ],
        },
      ],
      value: 'ไม่ยอมรับ'
    },
  ];

  editorContent: string;
  editorStyle = {
    height: '300px',
  };
  content = [];

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

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
    name: 'เงื่อนไขการให้บริการ และ นโยบายความเป็นส่วนตัว',
    creator: this.userUid,
    nameCreator: this.nameCreator,
    theme: {
      bannerImage: '',
    },
    attributes: this.modelFields,
  };

  modelSectionField: any = {
    attributes: [],
  };

  report = false;
  reports: any = [];
  result: '';

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.nameCreator = user.displayName;
      this.userUid = user.uid;
    });

    this.formService.readDataDoc(this.consentId).subscribe((item) => {
      item.attributes.forEach((att) => {
        this.fieldModels.push({
          type: 'field',
          icon: 'radio_button_checked',
          label: att['label'],
          description: 'Radio boxes',
          required: att['required']
        });
      });
    });

    // เอาข้อมูลมาแก้ไข
    this.formService.readConsent(this.consentId).subscribe((item) => {
      try {
        //console.log('data : ', item);
        //console.log('version : ', item['version']);
        this.versConsent = item['version'] + 1;
        this.option = 'edit';

        item.attributes.forEach((att) => {
          //console.log('read consent ', att);
          this.modelFields.push(att);
          //console.log(att);
        });

        this.formService.addversion(
          this.consentId,
          item['title'],
          item['creator'],
          item['nameCreator'],
          item['attributes'],
          item['version']
        );

        this.addDataContent();
      } catch (error) {
        console.log(error);
        this.option = 'create';
        //console.log('no attributes');
      }
    });
  }

  addDataContent(){
    this.content.splice(0, this.content.length);
    this.modelFields.forEach(element => {
      if (element.type === 'editor') {
        this.content.push(element.data);
      } else if (element.type === 'session') {
        this.content.push([
          '',
          element.children[1]['data'],
          '',
          element.children[3]['data'],
        ]);
      }
    });
    //console.log('******', this.modelFields);
    //console.log('//////', this.content);
  }

  onSubmit(e) {
    //console.log(e.html);
  }

  saveDataEditor(e, i, list = this.modelFields, indexOfChildren = 0) {
    if (list[i].type === 'editor') {
      list[i].data = e.html;
    } else if (list[i].type === 'session') {
      list[i].children[indexOfChildren]['data'] = e.html;
    }
  }

  saveTitleSession(e, i, list = this.modelFields, indexOfChildren = 0) {
    list[i].children[indexOfChildren]['data'] = e;
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
   * เรียกใช้เมื่อจะ reorder field
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
    this.addDataContent();
  }

  onDraggableCopied(event: DragEvent) {
    //console.log('draggable copied', JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {
    //console.log('draggable linked', JSON.stringify(event, null, 2));
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    //console.log('onDragged');
    if (effect === 'move') {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDragCanceled(event: DragEvent) {
    //console.log('drag cancelled', JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent) {
    //console.log('dragover', JSON.stringify(event, null, 2));
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
    //console.log(this.fieldModels);
    
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
   *
   * เพิ่มรายละเอียดแบบสอบถามใน firestore ผ่านฟังก์ชั่น addDataToFireStore
   * @memberof AddFormComponent
   */
  updateForm() {
    const input = new FormData();
    input.append('id', this.model._id);
    input.append('name', this.model.name);
    input.append('description', this.model.description);
    input.append('bannerImage', this.model.theme.bannerImage);
    input.append('attributes', JSON.stringify(this.model.attributes));

    //console.log('update', JSON.stringify(this.model.attributes));
    //console.log('---------', this.option);

    if (this.option === 'create') {
      this.formService.addConsentToFireStore(
        this.consentId,
        this.model.name,
        this.userUid,
        this.nameCreator,
        this.model.attributes
      );
    } else if (this.option === 'edit') {
      //console.log('update', JSON.stringify(this.model.attributes));
      this.formService.editConsentToFireStore(
        this.consentId,
        this.model.name,
        this.userUid,
        this.nameCreator,
        this.model.attributes,
        this.versConsent
      );
    }
  }

  initReport() {
    this.report = true;
    const input = {
      id: this.model._id,
    };
  }
  /**
   *
   * แสดง dialog เพื่อยืนยัน action
   * @param {*} i
   * @memberof AddFormComponent
   */
  confirmDialog(i, attribute = this.model.attributes): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result) {
        attribute.splice(i, 1);
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
