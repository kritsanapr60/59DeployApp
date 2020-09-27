import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';
import VConsole from 'vconsole';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserData } from 'src/app/UserData';
import { LineloginService } from '../../services/linelogin.service';
import { environment } from 'src/environments/environment';

export interface LINEUSERDATA {
  displayName: string;
  email: string;
  pictureUrl: string;
  // statusMessage: string;
}

@Component({
  selector: 'app-line-get-tokens',
  templateUrl: './line-get-tokens.component.html',
  styleUrls: ['./line-get-tokens.component.less'],
})
export class LineGetTokensComponent implements OnInit {
  /**
   * เปิด Console ใน Liff
   *
   * @memberof LineGetTokensComponent
   */
  vConsole = new VConsole();

  /**
   * ตัวแปลเก็บค่า sideBar false คือปิด true คือเปิด
   *
   * @memberof LineGetTokensComponent
   */
  sideBarOpen = false;

  /**
   * ตัวแปลเก็บข้อมูล user ที่ได้จาก line
   *
   * @type {Array<UserData>}
   * @memberof LineGetTokensComponent
   */
  userData: LINEUSERDATA;

  userUID: string;
  userFormDocument = [];
  // userForms: Array<object> = [];
  userForms;
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private line: LineloginService
  ) {}

  ngOnInit(): void {
    this.main();
    //console.log('line get tokens');

    // this.line.getUserProfile();
  }

  /**
   * logout ออกจาก liff
   *
   * @memberof LineGetTokensComponent
   */
  logOut() {
    this.line.logOut();
  }

  /**
   * เปลี่ยนค่าตัวแปล sideBarToggler ให้เป็นค่าตรงข้าม
   *
   * @memberof LineGetTokensComponent
   */
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  /**
   * ดึงข้อมูลโปรไฟล์ของ Line มาเก็บไว้ในตัวแปล userData
   * ข้อมูล pictureUrl userID statusMessage displayName email
   * @memberof LineGetTokensComponent
   */
  async getUserProfile() {
    const profile = await liff.getProfile();
    
    console.log(this.userUID = (await liff.getProfile()).userId);
    
    this.userForms = this.afs
      .collection('LineUser')
      .doc((await liff.getProfile()).userId)
      .valueChanges()
      .subscribe((a) => {
        console.log('a=', a);
        this.userData = {
          pictureUrl: a['photoURL'],
          displayName: a['displayName'],
          // statusMessage: profile.statusMessage,
          email: a['email'],
        };
      });

    // this.userData = {
    //   pictureUrl: profile.pictureUrl,
    //   displayName: profile.displayName,
    //   statusMessage: profile.statusMessage,
    //   email: await liff.getDecodedIDToken().email,
    // };
    // console.log('profile', profile);

    console.log('userData=', this.userData);
  }

  /**
   * กำหนด liff ด้วย liffId
   * เรียกใช้ liff login
   * @memberof LineGetTokensComponent
   */
  async main() {
    this.line.ready(environment.liffId);
    liff.ready.then(() => {
      if (liff.isLoggedIn()) {
        this.line.LineGetToken();
        this.getUserProfile();
      } else {
        liff.login();
      }
    });
  }
}
