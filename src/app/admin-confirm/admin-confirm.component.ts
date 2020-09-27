import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RejectComponent } from './reject/reject.component';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { PriorityStatus } from '../priority-status.enum';
interface Information {
  id;
  Uid;
  name;
  Status;
  Time;
}
@Component({
  selector: 'app-admin-confirm',
  templateUrl: './admin-confirm.component.html',
  styleUrls: ['./admin-confirm.component.less']
})
export class AdminConfirmComponent implements OnInit {
  Admin: string;
  constructor(
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private dialogEditor: MatDialog,
    private auth: AuthService
  ) { }

  Data: Observable<Information[]>;
  UserID: string;
  ngOnInit(): void {
    this.Data = this.afs.collection<Information>('ReqInformation')
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Information;
          const id = a.payload.doc.id;
          this.UserID = id;
          return { id, ...data };
        }))
      );

    this.auth.user$.subscribe((Admin) => {
      this.Admin = Admin.displayName;
    });
  }

  openDialog(status: string, idDoc: string) {
    const dialogRef = this.dialog.open(RejectComponent, { data: { status, idDoc } });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(idDoc);
      if (result !== 'false') {
        this.afs.collection('ReqInformation').doc(idDoc).update(
          {
            Status: 'reject',
      Priority : PriorityStatus.Reject,

            AdminName: this.Admin,
            TimeAdmin: firebase.firestore.FieldValue.serverTimestamp(),
            message: result
          }
        );
        //console.log('result', result, idDoc);
      }
    });
  }
}
