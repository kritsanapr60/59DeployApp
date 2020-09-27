import { Component, OnInit } from '@angular/core';
import { LineloginService } from 'src/app/services/linelogin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import liff from '@line/liff';
import { environment } from 'src/environments/environment';

export interface UserLine {
  pictureUrl: string;
  displayName: string;
  email: string;
  statusMessage: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  userData: UserLine;
  userForms;
  userUID: string;

  constructor(private afs: AngularFirestore, private line: LineloginService) { }

  ngOnInit(): void {
    this.main().then(console.log).catch(err => {
      console.error('onInit', err);
    });
  }

  /**
   * ดึงข้อมูลโปรไฟล์ของ Line มาเก็บไว้ในตัวแปร userData
   * ข้อมูล pictureUrl userID statusMessage displayName email
   * @memberof LineGetTokensComponent
   */
  async getUserProfile() {
    const profile = await liff.getProfile();
    this.line.userUID = profile.userId;
    this.userData = {
      pictureUrl: profile.pictureUrl,
      statusMessage: profile.statusMessage,
      displayName: profile.displayName,
      email: liff.getDecodedIDToken().email,
    };
    this.getDocumentForm();
  }

  getDocumentForm() {
    this.userForms = this.afs
      .collection('UserForm')
      .doc(this.line.userUID)
      .collection('form')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => ({
            id: a.payload.doc.id,
            data: a.payload.doc.data(),
          }))
        )
      );

    this.userUID = this.line.userUID;
  }
  /**
   * กำหนด liff ด้วย liffId
   * เรียกใช้ liff login
   * @memberof LineGetTokensComponent
   */
  async main() {
    try {
      await this.line.ready(environment.liffId);
      if (liff.isLoggedIn()) {
        this.getUserProfile();
      } else {
        liff.login();
      }
      return 'login';
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
