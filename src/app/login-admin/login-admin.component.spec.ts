import { FlexLayoutModule } from '@angular/flex-layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGuard } from '../services/auth.guard';
import { AuthService } from '../services/auth.service';

import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '../app-routing.module';
import { LoginAdminComponent } from './login-admin.component';
import '../../matchMedia.mock';
import { APP_BASE_HREF } from '@angular/common';

import { AngularFirestoreModule, AngularFirestore, SETTINGS } from '@angular/fire/firestore';
import { AngularFireModule, FIREBASE_APP_NAME, FIREBASE_OPTIONS, FirebaseApp } from '@angular/fire';
import * as firebase from '@firebase/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ViewFormComponent } from '../form/view-form/view-form.component';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { MaterialModule } from '../material/material.module';
import { AddFormComponent } from '../form/add-form/add-form.component';
// import { EditFormComponent } from '../form/edit-form/edit-form.component';

describe('LoginAdminComponent', () => {
  let component: LoginAdminComponent;
  let fixture: ComponentFixture<LoginAdminComponent>;

  const config = {
    apiKey: 'AIzaSyAIqohg5_f_VBJkNydAN_fDcZIU4kexOBM',
    authDomain: 'incubate-internship-2020.firebaseapp.com',
    databaseURL: 'https://incubate-internship-2020.firebaseio.com',
    projectId: 'incubate-internship-2020',
    storageBucket: 'incubate-internship-2020.appspot.com',
    messagingSenderId: '737851649336',
    appId: '1:737851649336:web:8456a2de3d168ac62b25cd',
    measurementId: 'G-H2QLLHPJ7Q'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule,
        FlexLayoutModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        HttpClientModule,
        // add viewform module
        CdkScrollableModule,
        ScrollingModule,
        MaterialModule
      ],
      providers: [AuthGuard, AuthService,
        { provide: APP_BASE_HREF, useValue: '/' }],
      declarations: [LoginAdminComponent, LoadingSpinnerComponent, AddFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    let authService = TestBed.get(AuthService);
    let authGuard = TestBed.get(AuthGuard);
    fixture = TestBed.createComponent(LoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('if user logout data should be null', () => {
  //   this.authService.signOut();
  //   expect(this.authService.user$).toBeNull();
  // });

  // it('should render title', () => {
  //   fixture = TestBed.createComponent(LoginAdminComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Admin Login');
  // });

  // it('should have login button', () => {
  //   fixture = TestBed.createComponent(LoginAdminComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('button').textContent).toContain(' Login With Google ');
  // });

});
