import { TestBed } from '@angular/core/testing';
import * as firebase from '@firebase/testing';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthGuard } from './auth.guard';
import { APP_BASE_HREF } from '@angular/common';
import { LoginAdminComponent } from '../login-admin/login-admin.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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
import { AddFormComponent } from '../form/add-form/add-form.component';
import { EditFormComponent } from '../form/edit-form/edit-form.component';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';


describe('AuthGuard', () => {
  let guard: AuthGuard;

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
        MaterialModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
