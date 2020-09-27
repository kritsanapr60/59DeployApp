import { TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { LoginAdminComponent } from '../login-admin/login-admin.component';
import { APP_BASE_HREF } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ViewFormComponent } from '../form/view-form/view-form.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { environment } from 'src/environments/environment';
import { AddFormComponent } from '../form/add-form/add-form.component';
import { EditFormComponent } from '../form/edit-form/edit-form.component';
import { MaterialModule } from '../material/material.module';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginAdminComponent,
        ViewFormComponent, LoadingSpinnerComponent, AddFormComponent, EditFormComponent
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseApp),
        AngularFirestoreModule,
        RouterModule,
        AppRoutingModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        FlexLayoutModule,
        MatInputModule,
        MatDialogModule,
        BrowserAnimationsModule,
        FormsModule,
        // add viewform module
        CdkScrollableModule,
        ScrollingModule,
        MaterialModule,

      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // it('should return true if loggedIn is true', () => {
  //   expect(service.user$).toBeFalsy();
  //   authService.loggedIn = true;
  //   expect(service.user$).toBeTruthy();
  // });

  // it('user should be null', () => {
  //   //console.log(service.user$);
  //   expect(service.user$).toBeFalse();
  // });
  // it('should return a rejected promise', () => {
  //   authState = {
  //     email: 'lanchanagupta@gmail.com',
  //     password: 'password',
  //   };

  //   mockAngularFireAuth = {
  //     auth: jasmine.createSpyObj('auth', {
  //       'signInWithPopup': Promise.reject({
  //         code: 'auth/account-exists-with-different-credential'
  //       }),
  //     }),
  //     authState: Observable.of(authState)
  //   };
  //   mockAngularFireAuth.auth.signInWithPopup()
  //     .catch((error: { code: string }) => {
  //       expect(error.code).toBe('auth/account-exists-with-different-credential');
  //     });
  // });


  // it('should return a resolved promise', () => {
  //   authState = {
  //     email: 'lanchanagupta@gmail.com',
  //     password: 'password',
  //     uid: 'nuDdbfbhTwgkF5C6HN5DWDflpA83'
  //   };

  //   mockAngularFireAuth = {
  //     auth: jasmine.createSpyObj('auth', {
  //       'signInWithPopup': Promise.resolve({
  //         user: authState
  //       }),
  //     })
  //   };
  //   mockAngularFireAuth.auth.signInWithPopup()
  //     .then(data => {
  //       expect(data['user']).toBe(authState);
  //     });
  // });


});
