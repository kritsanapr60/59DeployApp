import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { PriorityStatus } from 'src/app/priority-status.enum';

interface File {
  name: string;
  url: string;
}
@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.less']
})
export class AcceptComponent {
  files: File[] = [];
  file: any;
  path: string;
  uploadPercentage$: Observable<number>;
  downloadURL: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private location: Location,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    public auth: AuthService,
  ) {
  }

  backClicked() {
    this.location.back();
  }

  onFileUpload(files: FileList) {
    this.file = files[0];
    this.path = `File/${files[0].name}`;

  }
  UploadStorage() {
    this.storage.upload(this.path, this.file);
    this.uploadPercentage$ = this.storage.upload(this.path, this.file).percentageChanges();
    const ref = this.storage.ref(this.path);
    const task = this.storage.upload(this.path, this.file);

    task.snapshotChanges().pipe(
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        //console.log(this.downloadURL);
        ref.getDownloadURL().toPromise().then(url => {
          const allFile: File = { name: this.file.name, url };
          this.afs.collection('Files').add(allFile);
          this.UpdateStatus();
        });
      })
    ).subscribe();
  }
  UpdateStatus() {
    this.afs.collection('ReqInformation').doc(this.data['idDoc']).update(
      {
        Status: 'accept',
      Priority : PriorityStatus.Accept,

        AdminName: this.auth.nameAdmin,
        downloadURL: this.downloadURL,
        TimeAdmin: firebase.firestore.FieldValue.serverTimestamp(),
      }
    );
  }
}
