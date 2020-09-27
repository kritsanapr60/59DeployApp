import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LineloginService } from 'src/app/services/linelogin.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { PriorityStatus } from 'src/app/priority-status.enum';
@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.less']
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  UserID: string;
  option: string;
  Admin: string;
  AdminUid: string;
  path: string;
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    const params = this.route.snapshot.paramMap;
    this.UserID = params.get('id');
    this.option = params.get('option');
    if (this.option == 'copy'){
      this.path = 'ReqInformation';
    }
    else {
      this.path = 'CancelsInformation';
    }
  }

  ngOnInit() {
    //console.log(this.UserID);
    this.startUpload();
    this.auth.user$.subscribe((Admin) => {
      this.Admin = Admin.displayName;
      this.AdminUid = Admin.uid;
    });
  }

  startUpload() {
    //console.log('upload');


    // The storage path
    const path = `File/${this.UserID}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.afs.collection(this.path).doc(this.UserID).update(
          {
            AdminUid: this.AdminUid,
            AdminName: this.Admin,
            Status: 'accept',
      Priority : PriorityStatus.Accept,

            downloadURL: this.downloadURL,
            path,
            TimeAdmin: firebase.firestore.FieldValue.serverTimestamp()
          });
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
