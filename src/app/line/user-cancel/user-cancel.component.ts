import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import liff from '@line/liff';
import { Timestamp } from '@firebase/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LineloginService } from 'src/app/services/linelogin.service';
import { map } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { FormService } from 'src/app/form/form.service';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { threadId } from 'worker_threads';
import { environment } from 'src/environments/environment';
/**
 * Cancel interface เพื่อให้คลาสเรียกใช้ได้ 
 * value ค่าของ Selecter
 * viewValue ค่าที่จะเเสดงใน Selecter ในหน้า HTML
 * @interface Cancel
 */
interface Cancel {
  value: string;
  viewValue: string;
}
/**
 * Uid เก็บข้อมูล UserID ของผู้ใช้ที่ Login ผ่าน Line 
 * Name เก็บชื่อผู้ใช้งาน ที่ Login ผ่าน Line
 * Request เก็บชนิดคำขอของผู้ใช้
 * Status สถานะการดำเนินงานของผู้มูล
 * Time เวลาที่ขอยกเลิกข้อมูล
 * NamrAdmin ชื่อผู้ดูเเลระบบที่ทำรายการอนุมัติหรือปฏิเสธ
 * TimeReply เวลาที่ Admin ตอบกลับหรือ ทำรายการให้
 * Result ข้อมูลการตอบกลับกรณี Accept หรือ Reject
 *
 * @interface CancelsInformation
 */
interface CancelsInformation {
  Uid: string;
  Name: string;
  Request: string;
  Status: string;
  Time: Timestamp;
  NameAdmin: string;
  TimeAdmin: Timestamp;
  message: string;
}
@Component({
  selector: 'app-user-cancel',
  templateUrl: './user-cancel.component.html',
  styleUrls: ['./user-cancel.component.less']
})
export class UserCancelComponent implements OnInit {
  /**
   * cancels เรียกใช้ Interface Array 
   * value CancelKeepData เป็น value ของ viewValue ยกเลิกการเก็บข้อมูลส่วนบุคคล
   * value CancelUseData เป็น value ของ viewValue ยกเลิกการใช้ข้อมูลส่วนบุคคล
   * value CancelDiscloseData เป็น value ของ viewValue ยกเลิกการเปิดเผยข้อมูลส่วนบุคคล
   * 
   * 
   * @type {Cancel[]}
   * @memberof UserCancelComponent
   */
  cancels: Cancel[] = [
    { value: 'CancelKeepData', viewValue: 'ยกเลิกการเก็บข้อมูลส่วนบุคคล' },
    { value: 'CancelUseData', viewValue: 'ยกเลิกการใช้ข้อมูลส่วนบุคคล' },
    { value: 'CancelDiscloseData', viewValue: 'ยกเลิกการเปิดเผยข้อมูลส่วนบุคคล' },
  ];

  CancelsInformation: AngularFirestoreCollection<CancelsInformation>;
  Data$: Observable<CancelsInformation[]>;
  userUid: string;
  valueSelector: string;

  Request: string;
  allRequest;

  valueView;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';



  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private line: LineloginService,
    private _snackBar: MatSnackBar,
    private form: FormService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  /**
   * ฟังก์ชันส่งข้อมูลผู้ใช้ที่ต้องการขอเยกเลิกการให้ / ใช้ / เก็บข้อมูลส่วนตัว ไว้ที่ Firebase 
   * Call Snackbar เมื่อผูใช้ส่งคำร้องสำเร็จ
   * Get UserID มาเก็บไว้ที่ Uid 
   * Get User name มาเก็บไว้ที่ ์Name
   * กำหนดสถานะ ให้เป็น pending เมื่อมีการส่งข้อมูลไปเก็บที่ Firebase Fierstore
   * 
   * For Loop เพื่อนำ value ที่ผู้ใช้กดเลือก มาเทียบเพื่อเอา viewValue มาเก็บเป็น TypeRequest 
   * Call cancelsInformation จาก Form Service เพื่อเก็บข้อมูลไปไว้ที่ Firestore 
   *
   * @memberof UserCancelComponent
   */
  async sendCancel() {
    this.line.ready(environment.liffId);
    this._snackBar.open('ระบบได้ทำการส่งคำขอไปที่ผู้ดูแลระบบเรียบร้อยแล้ว', '', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
    const Uid = (await liff.getProfile()).userId;
    const Name = (await liff.getProfile()).displayName;
    const Status = 'pending';
    //console.log(`Uid :${Uid}`);
    //console.log(`Status :${Status}`);


    for (let i = 0; i <= this.cancels.length; i++) {
      if (this.valueSelector == this.cancels[i]['value']) {
        // //console.log('this.cancels', this.cancels[i]['viewValue']);
        this.valueView = this.cancels[i]['viewValue'];
        break;
      }
    }
    //console.log(`Valueselector : ${this.valueSelector}`);
    //console.log(`external : ${this.valueView}`);
    //console.log(`Value Selecter : ${this.valueSelector}`);
    this.form.cancelsInformation(
      Uid,
      Name,
      this.valueView.toString(),
      Status,
      this.valueSelector
    );
  }

  /**
   * Function Show จะถุกเรียกใช้งานเมื่อ ผู้ใช้กดดูประวัติการขอยกเลิกการ เก็บ/ใช้/เผยเเพร่
   * เรียก User ID ของผู้ใช้เมื่อ Login ผ่าน Line จาก Line Service ที่สร้างไว้ 
   * ทำการ where จาก firebase collection ที่มีฟิลด์ CancelType เท่ากับ valueSelecter ที่รับมา เเล้วเก็บไว้ที่ตัวแปร CancelsInformation
   * จากนั้นเรา CalcelsInformation มาเก็บไว้ที่ ตัวแปร Data$ ที่เป็น Observable
   * 
   * @memberof UserCancelComponent
   */
  Show() {
    const id = this.line.userUID;
    //console.log(`UID : ${this.line.userUID}`);

    this.CancelsInformation = this.afs.collection('CancelsInformation', ref => ref
    .where('CancelType', '==', this.valueSelector)
    .where('Uid', '==', this.line.userUID));
    this.Data$ = this.CancelsInformation.valueChanges();
    //console.log(this.line.userData);
    //console.log(this.valueSelector);
    //console.log(this.allRequest);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

}
