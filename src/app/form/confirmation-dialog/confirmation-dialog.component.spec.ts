// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ConfirmationDialogComponent } from './confirmation-dialog.component';

// import 'src/matchMedia.mock.ts';
// import { APP_BASE_HREF } from '@angular/common';

// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireModule } from '@angular/fire';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppRoutingModule } from 'src/app/app-routing.module';
// import { environment } from 'src/environments/environment';
// import { LoginAdminComponent } from 'src/app/login-admin/login-admin.component';
// import { LoadingSpinnerComponent } from 'src/app/loading-spinner/loading-spinner.component';
// import { AddFormComponent } from '../add-form/add-form.component';
// import { EditFormComponent } from '../edit-form/edit-form.component';
// import { MaterialModule } from 'src/app/material/material.module';
// import { ViewFormComponent } from '../view-form/view-form.component';
// import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// describe('ConfirmationDialogComponent', () => {
//   let component: ConfirmationDialogComponent;
//   let fixture: ComponentFixture<ConfirmationDialogComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         AppRoutingModule,
//         BrowserAnimationsModule,
//         AngularFireModule.initializeApp(environment.firebaseApp),
//         AngularFirestoreModule,
//         FormsModule,
//         HttpClientModule,
//         // add viewform module
//         CdkScrollableModule,
//         ScrollingModule,
//         MaterialModule,
//         MatDialogModule
//       ],
//       providers: [
//         // AuthGuard, AuthService,
//         { provide: APP_BASE_HREF, useValue: '/' },
//         {
//           provide: MatDialogRef,
//           useValue: {}
//         },
//         { provide: MAT_DIALOG_DATA, useValue: {} }],
//       declarations: [LoginAdminComponent,
//         ViewFormComponent, LoadingSpinnerComponent, AddFormComponent, EditFormComponent, ConfirmationDialogComponent]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ConfirmationDialogComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
