import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';

import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
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
describe('FormService', () => {
  let service: FormService;

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
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
