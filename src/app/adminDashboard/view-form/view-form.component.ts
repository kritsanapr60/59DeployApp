import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PaginationService } from 'src/app/form/pagination.service';
import { FormService } from 'src/app/form/form.service';
import { ConfirmationDialogComponent, ConfirmDialogModel } from 'src/app/form/confirmation-dialog/confirmation-dialog.component';


interface Datas {
  value: string;
  valueView: string;
}
/**
 *
 *
 * @export หน้าแสดงผล infinite scroll
 * @class ViewFormComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.less']
})
export class ViewFormComponent implements OnInit {
  // Search Form
  datas: Datas[] = [
    { value: 'title', valueView: 'ชื่อฟอร์ม' },
    { value: 'nameCreator', valueView: 'ชื่อผู้สร้าง' }
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

  /**
   * Creates an instance of ViewFormComponent.
   * @param {PaginationService} page
   * @param {AngularFirestore} afs
   * @param {AuthService} auth
   * @param {FormBuilder} fb
   * @memberof ViewFormComponent
   */
  constructor(
    public page: PaginationService<Array<object>>,
    public auth: AuthService,
    private fb: FormBuilder,
    private formService: FormService,
    public router: Router,
    public dialog: MatDialog,
    private afs: AngularFirestore) { }

  /**
   *
   * สร้าง form เก็บค่าว่าผู้ใช้จะเรียงลำดับตามอะไร เช่น ชื่อเรื่อง ชื่อผู้สร้าง วันที่สร้าง
   * @memberof ViewFormComponent
   */
  myForm = this.fb.group({
    queryOption: '',
    searchOption: '',
    searchWord: ''
  });

  /**
   *
   *
   * @memberof ViewFormComponent
   */
  ngOnInit(): void {
    this.formService.getDatatoFormView().subscribe( data => {
      data.forEach(indexs => {
        //console.log('data:', indexs);
        this.form_title = indexs['title'];
        this.form_description = indexs['description'];
        this.form_nameCreator = indexs['nameCreator'];
      });
    });
    // Search Form
    this.sortBy();
    this.myForm.valueChanges.subscribe( (item) => {
      if (item.searchOption === 'nameCreator') {
        this.nameSearch = 'ชื่อคนสร้าง';
        //console.log('ชื่อคนสร้าง');
      } else {
        this.nameSearch = 'ชื่อฟอร์ม';
        //console.log('ชื่อฟอร์ม');
      }
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
    // //console.log(e);
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
    this.page.init('form', this.queryOption, { reverse: this.sortBtnEvent, prepend: false });
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

  search(){
    this.page.init('form', this.searchOption, {where: this.searchWord});
  }

  delete(docID: string, formTitle: string){
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
        this.afs.doc('form/' + docID).delete();
        window.location.reload();
      }
    });
  }
}
