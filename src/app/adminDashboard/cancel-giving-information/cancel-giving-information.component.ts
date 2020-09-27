import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Timestamp } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditorComponent } from '../dialog-editor/dialog-editor.component';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { PriorityStatus } from 'src/app/priority-status.enum';

export interface dataRequest {
  CancelType: string;
  Request: string;
  Status: string;
  Time: Timestamp;
  Uid: string;
}
@Component({
  selector: 'app-cancel-giving-information',
  templateUrl: './cancel-giving-information.component.html',
  styleUrls: ['./cancel-giving-information.component.less']
})
export class CancelGivingInformationComponent implements OnInit {

  dataUserRequests;
  NameAdmin: string;

  constructor(private afs: AngularFirestore, private dialogEditor: MatDialog, private auth: AuthService) { }
  /**
   *
   *
   * @memberof CancelGivingInformationComponent
   */
  ngOnInit(): void {
    this.dataUserRequests = this.afs
      .collection('CancelsInformation')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  /**
   *
   *
   * @param {*} req
   * @memberof CancelGivingInformationComponent
   */
  readData(req) {
    this.dataUserRequests = this.afs
      .collection('CancelsInformation', (ref) => ref.where('Request', '==', req))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );

    this.auth.user$.subscribe((item) => {
      this.NameAdmin = item.displayName;
    });
  }
  /**
   *
   *
   * @param {string} status
   * @param {string} idDoc
   * @memberof CancelGivingInformationComponent
   */
  openDialog(status: string, idDoc: string) {
    let priority;
    if (status == 'accept') {
      priority = PriorityStatus.Accept;
    }
    else {
      priority = PriorityStatus.Reject;
    }
    const dialogRef = this.dialogEditor.open(DialogEditorComponent, {
      data: { status, idDoc },
      height: '200px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != 'false') {
        this.afs.collection('CancelsInformation').doc(idDoc).set({
          Status: status,
          Priority: priority,
          NameAdmin: this.NameAdmin,
          TimeReply: firebase.firestore.FieldValue.serverTimestamp(),
          Result: result
        }, { merge: true });
        //console.log('result', result, idDoc);
      }
    });
  }

}
