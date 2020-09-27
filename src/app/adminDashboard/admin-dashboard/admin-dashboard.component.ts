import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.less'],
})
export class AdminDashboardComponent implements OnInit {
  sideBarOpen: boolean;
  data;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((item) => {
      this.data = item;
      //console.log('admin data', item);
    });
    
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
   * ฟังก์ชั่นออกจากระบบ
   *
   * @memberof ViewFormComponent
   */
  logOut() {
    this.auth.signOut();
  }
}
