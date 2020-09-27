import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TemplateService } from 'src/app/services/template.service';
import { Field } from 'src/app/field';
import { Timestamp } from '@firebase/firestore';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PaginationService } from 'src/app/form/pagination.service';

export interface AdminTemplateFormationItem {
  title: string;
  nameCreator: string;
  creator: string;
  version: number;
  attributes: Array<Field>;
  createDate: Timestamp;
}

@Component({
  selector: 'app-user-form-import-data',
  templateUrl: './user-form-import-data.component.html',
  styleUrls: ['./user-form-import-data.component.less']
})
export class UserFormImportDataComponent implements OnInit {

  formContent;
  myForm = this.fb.group({
    queryOption: '',
  });

  constructor(
    private route: ActivatedRoute,
    public page: PaginationService<Array<object>>,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private template: TemplateService
  ) {
    const paraMap = this.route.snapshot.paramMap;
    this.option = paraMap.get('option');
    this.formId = paraMap.get('formID');
  }
  formId: string;
  option: string;
  temPlate: Array<Field>;
  queryOption: string;
  
  sortBtnEvent = true;
  ngOnInit(): void {
    this.page.init('FormImportData','name');
    this.myForm.valueChanges.subscribe((item) => {
      this.queryOption = item.queryOption;
    });
  }
  sortBy() {
    this.sortBtnEvent = !this.sortBtnEvent;
    this.page.init('FormImportData', this.queryOption, { reverse: this.sortBtnEvent, prepend: false });
  }

  /**
   * เมื่อ scroll bar อยู่ที่ bottom จะเรียกฟังก์ชั่น more เพิ่งดึงข้อมูลมาเพิ่ม
   *
   * @param {*} e ค่าตำแหน่งของ scroll bar จาก scrollable directive
   * @memberof ViewFormComponent
   */
  scrollHandler(e: any) {
    //console.log(e);
    if (e === 'bottom') {
      this.page.more();
    }
  }

  /**
   *
   * ไปดึงข้อมูลจาก firestore ผ่าน pagination service โดยใช้ค่า queryOption และ sortBtnEvent
   *
   * @memberof ViewFormComponent
   */
}
