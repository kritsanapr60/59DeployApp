import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PaginationService } from 'src/app/form/pagination.service';
import { pageViewFormServiceProvider } from 'src/app/form/pagination.service.provider';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/form/confirmation-dialog/confirmation-dialog.component';
import { RejectComponent } from 'src/app/admin-confirm/reject/reject.component';
import * as firebase from 'firebase';
import { PriorityStatus } from 'src/app/priority-status.enum';

interface Datas {
  value: string;
  valueView: string;
}

@Component({
  selector: 'app-req-cancel',
  templateUrl: './req-cancel.component.html',
  styleUrls: ['./req-cancel.component.less'],
  providers: [pageViewFormServiceProvider]

})
export class ReqCancelComponent implements OnInit {
  // Search Option Form
  Options: Datas[] = [
    { value: 'CancelUseData', valueView: 'ยกเลิกการใช้ข้อมูลส่วนบุคคล' },
    { value: 'CancelKeepData', valueView: 'ยกเลิกการเก็บข้อมูลส่วนบุคคล' },
    { value: 'CancelDiscloseData', valueView: 'ยกเลิกการเปิดเผยข้อมูลส่วนบุคคล' }
  ];
  // myForm: FormGroup;
  searchWord: string;
  searchOption: string;
  nameSearch: string;
  titleSearch: string;
  title: string;

  nameCreator;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  /**
   *
   * เก็บค่าว่าผู้ใช้จะเรียงลำดับตามอะไร เช่น ชื่อเรื่อง ชื่อผู้สร้าง วันที่สร้าง
   * @type {string}
   * @memberof ViewFormComponent
   */
  queryOption: string;
  /**
   * ถ้าเป็น true จะเป็น desc มาก->น้อย
   * @type {boolean}
   * @memberof ViewFormComponent
   */
  sortBtnEvent = true;
  form_title: string;
  form_description: string;
  form_nameCreator: string;

  constructor(
    public page: PaginationService<Array<object>>,
    public auth: AuthService,
    private fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog,
    private afs: AngularFirestore
    ) { }


  /**
   *
   * สร้าง form เก็บค่าว่าผู้ใช้จะเรียงลำดับตามอะไร เช่น ชื่อเรื่อง ชื่อผู้สร้าง วันที่สร้าง
   * @memberof ViewFormComponent
   */
  myForm = this.fb.group({
    queryOption: '',
    searchOption: 'CancelType',
    searchWord: ''
  });

  /**
   *
   *
   * @memberof ViewFormComponent
   */
  ngOnInit(): void {
    this.page.init('CancelsInformation', 'Time');
    this.myForm.valueChanges.subscribe((item) => {
      this.queryOption = item.queryOption;
      this.searchWord = item.searchWord;
      this.searchOption = item.searchOption;
    });
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
  sortBy() {
    this.sortBtnEvent = !this.sortBtnEvent;
    //console.log(this.sortBtnEvent, '******', this.queryOption);
    this.page.init('CancelsInformation', this.queryOption, { reverse: this.sortBtnEvent, prepend: false });
  }

  /**
   * ฟังก์ชั่นออกจากระบบ
   *
   * @memberof ViewFormComponent
   */
  logout() {
    this.auth.signOut();
  }

  detailPage() {
    this.router.navigate(['add', 'add']);
  }

  search() {
    //console.log(this.searchWord, this.searchOption);
    this.page.init('CancelsInformation', 'CancelType', { where: this.searchWord });
  }

  delete(docID: string, formTitle: string) {
    //console.log(docID);
    const message = `คุณแน่ใจหรือไม่ที่จะลบฟอร์ม ` + formTitle;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const result = dialogResult;
      if (result) {
        this.afs.doc('CancelsInformation/' + docID).delete();
        window.location.reload();
      }
    });
  }

  openDialog(status: string, idDoc: string) {
    const dialogRef = this.dialog.open(RejectComponent, { data: { status, idDoc } });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(idDoc);
      if (result !== 'false' && status === 'reject') {
        this.afs.collection('CancelsInformation').doc(idDoc).update(
          {
            Status: 'reject',
            Priority: PriorityStatus.Reject,
            AdminName: this.auth.nameAdmin,
            TimeAdmin: firebase.firestore.FieldValue.serverTimestamp(),
            message: result
          }
        );
        //console.log('result', result, idDoc);
      }
      else if (status === 'accept') {
        this.afs.collection('CancelsInformation').doc(idDoc).update(
          {
            Status: 'accept',
      Priority : PriorityStatus.Accept,
            AdminName: this.auth.nameAdmin,
            TimeAdmin: firebase.firestore.FieldValue.serverTimestamp(),
            message: result
          }
        );
        //console.log('result', result, idDoc);
      }
    });
  }
}

