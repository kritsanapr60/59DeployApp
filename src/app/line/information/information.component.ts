import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
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

import { MatAccordion } from '@angular/material/expansion';
import { PriorityStatus } from '../../priority-status.enum';
import { environment } from 'src/environments/environment';
interface Information {
  // id: string;
  // Status: string;
  // Time;
  id: string;
  Uid: string;
  Status: string;
  Time;
  message: string;
  AdminName;
  AdminUid;
  TimeAdmin;
  downloadURL;
  Path;
}

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.less'],
})
export class InformationComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private line: LineloginService,
    private _snackBar: MatSnackBar
  ) {}
  panelOpenState = false;
  createDate: Timestamp;
  ID: string;
  Informations: AngularFirestoreCollection<Information>;
  Data: Observable<Information[]>;
  userUID: string;
  show: boolean = false;
  ngOnInit() {
    this.Data = this.afs
      .collection<Information>('ReqInformation')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Information;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
    this.userUID = this.line.userUID;
  }

  /**
   * Function เก็บ UserID กับ Status และ Time ขึ้น Firebase
   * กำหนด Status default เป็น pending
   * @memberof InformationComponent
   */
  async reqinfomation() {
    await this.line.ready(environment.liffId);
    this._snackBar.open(
      'ระบบได้ทำการส่งคำขอไปที่ผู้ดูแลระบบเรียบร้อยแล้ว',
      '',
      {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      }
    );
    const { userId, displayName } = await liff.getProfile();
    const Status = 'pending';

    this.afs.collection('ReqInformation').add({
      name: displayName,
      Uid: userId,
      Status,
      Priority : PriorityStatus.Pending,
      Time: firebase.firestore.FieldValue.serverTimestamp()
    });
    const show = document.getElementById('ShowCard');
    if (window.getComputedStyle(show).visibility === 'hidden') {
      show.style.visibility = 'visible';
    }
  }

  /**
   * Show() เป็น Function Show Card บน HTML
   * ที่กำหนด id เป็น ShowCard
   * @memberof InformationComponent
   */
  Show() {
    const show = document.getElementById('ShowCard');
    const NotShowCard = document.getElementById('NotShowCard');
    if (window.getComputedStyle(show).visibility === 'hidden') {
      show.style.visibility = 'visible';
    }
  }
}
