import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaginationService } from 'src/app/form/pagination.service';
import { pageViewImportFormServiceProvider } from 'src/app/form/pagination.service.provider';

@Component({
  selector: 'app-show-form-import-data',
  templateUrl: './show-form-import-data.component.html',
  styleUrls: ['./show-form-import-data.component.less'],
  providers: [pageViewImportFormServiceProvider]
})
export class ShowFormImportDataComponent implements OnInit {
  queryOption: string;

  /**
   *
   * สร้าง form เก็บค่าว่าผู้ใช้จะเรียงลำดับตามอะไร เช่น ชื่อเรื่อง ชื่อผู้สร้าง วันที่สร้าง
   * @memberof ViewFormComponent
   */
  myForm = this.fb.group({
    queryOption: '',
  });
  sortBtnEvent = true;

  constructor(
    public page: PaginationService<Array<object>>,
    public auth: AuthService,
    private fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog,
    private afs: AngularFirestore
  ) { }

  dataForm: Array<Object>;
  docID: string;
  docIDForm;

  /**
   *
   * สร้าง form เก็บค่าว่าผู้ใช้จะเรียงลำดับตามอะไร เช่น ชื่อเรื่อง ชื่อผู้สร้าง วันที่สร้าง
   * @memberof ViewFormComponent
   */
  myOption = this.fb.group({
    queryOption: '',
  });

  ngOnInit(): void {
    if (this.auth.UidAdmin) {
      console.log('admin');

      this.page.init('FormImportData', 'createDate');
      console.log(this.page.data);

    }
    else {
      console.log('user');

      this.page.init('FillOutForm', 'Date');
    }
    this.myForm.valueChanges.subscribe((item) => {
      this.queryOption = item.queryOption;
    });
  }
  sortByAdmin() {
    this.sortBtnEvent = !this.sortBtnEvent;
    this.page.init('FormImportData', this.queryOption, { reverse: this.sortBtnEvent, prepend: false });
  }
  sortByUser() {
    this.sortBtnEvent = !this.sortBtnEvent;
    this.page.init('FillOutForm', this.queryOption, { reverse: this.sortBtnEvent, prepend: false });
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
