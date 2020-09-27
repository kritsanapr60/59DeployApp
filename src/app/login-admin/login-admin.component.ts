import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormBuilder, FormGroup } from '@angular/forms';

const googleLogoURL = 'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
/**
 *component หน้าล็อคอิน
 *
 * @export
 * @class LoginAdminComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.less']
})
export class LoginAdminComponent implements OnInit {

/**
 *Creates an instance of LoginAdminComponent.
 * @param {AuthService} auth - เรียกใช้ Auth Service
 * @memberof LoginAdminComponent
 */
constructor(public auth: AuthService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
  this.matIconRegistry.addSvgIcon(
    'logo',
    this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }


  ngOnInit(): void {
  }

}
