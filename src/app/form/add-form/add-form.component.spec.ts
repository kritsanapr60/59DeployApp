import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'src/matchMedia.mock.ts';

import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { environment } from 'src/environments/environment';
import { LoginAdminComponent } from 'src/app/login-admin/login-admin.component';
import { LoadingSpinnerComponent } from 'src/app/loading-spinner/loading-spinner.component';
import { ViewFormComponent } from '../view-form/view-form.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AddFormComponent } from './add-form.component';
import { EditFormComponent } from '../edit-form/edit-form.component';
describe('AddFormComponent', () => {
  let component: AddFormComponent;
  let fixture: ComponentFixture<AddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseApp),
        AngularFirestoreModule,
        FlexLayoutModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        // add viewform module
        CdkScrollableModule,
        ScrollingModule,
        MaterialModule
      ],
      providers: [AuthGuard, AuthService,
        { provide: APP_BASE_HREF, useValue: '/' }],
        declarations: [
          LoginAdminComponent,
          ViewFormComponent, LoadingSpinnerComponent, AddFormComponent, EditFormComponent
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should get uid', () => {
  //   expect(component.userUid).toBeTruthy();
  // });

});
