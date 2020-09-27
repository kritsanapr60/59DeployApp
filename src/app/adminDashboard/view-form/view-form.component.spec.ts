// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ViewFormComponent } from './view-form.component';
// import 'src/matchMedia.mock.ts';
// import { APP_BASE_HREF } from '@angular/common';

// import { AngularFirestoreModule, AngularFirestore, SETTINGS } from '@angular/fire/firestore';
// import { AngularFireModule, FIREBASE_APP_NAME, FIREBASE_OPTIONS, FirebaseApp } from '@angular/fire';
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

// describe('ViewFormComponent', () => {
//   let component: ViewFormComponent;
//   let fixture: ComponentFixture<ViewFormComponent>;

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
//         MaterialModule
//       ],
//       providers: [
//         // AuthGuard, AuthService,
//         { provide: APP_BASE_HREF, useValue: '/' }],
//       declarations: [LoginAdminComponent,
//         ViewFormComponent, LoadingSpinnerComponent, AddFormComponent, EditFormComponent]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ViewFormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   // it('should have title', () => {
//   //   const compiled = fixture.nativeElement;
//   //   expect(compiled.querySelector('h1').textContent).toContain(' ดูแบบสอบถามทั้งหมด ');
//   // });
//   // it('should have scroll div', () => {
//   //   const compiled = fixture.nativeElement;
//   //   expect(compiled.querySelector('div scrollable'));
//   // });

// });
