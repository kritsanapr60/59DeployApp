// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ReqCancelComponent } from './req-cancel.component';
// import { AuthGuard } from 'src/app/services/auth.guard';
// import { AuthService } from 'src/app/services/auth.service';
// import { AdminGuard } from 'src/app/services/admin.guard';
// import { PaginationService } from 'src/app/form/pagination.service';

// import { LineLoginGuard } from 'src/app/line/line-login.guard';
// import { LineloginService } from 'src/app/services/linelogin.service';
// import { TemplateService } from 'src/app/services/template.service';


// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AngularFireModule } from '@angular/fire';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatCardModule } from '@angular/material/card';
// import { MatSelectModule } from '@angular/material/select';
// import { MatInputModule } from '@angular/material/input';
// import { MatDialogModule } from '@angular/material/dialog';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
// import { environment } from 'src/environments/environment';
// import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
// // import { DndModule } from 'ngx-drag-drop/dnd.module';
// import { QuillModule } from 'ngx-quill';

// describe('ReqCancelComponent', () => {
//   let component: ReqCancelComponent;
//   let fixture: ComponentFixture<ReqCancelComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterModule.forRoot([]),
//         BrowserModule,
//         BrowserAnimationsModule,
//         AngularFireModule.initializeApp(environment.firebaseApp),
//         AngularFirestoreModule,
//         AngularFireAuthModule,
//         AngularFireAnalyticsModule,
//         RouterModule,
//         FlexLayoutModule,
//         MatIconModule,
//         HttpClientModule,
//         MatFormFieldModule,
//         MatCardModule,
//         MatSelectModule,
//         MatInputModule,
//         MatButtonModule,
//         AngularFirestoreModule,
//         FormsModule,
//         MatDialogModule,
//         ReactiveFormsModule,
//         CdkScrollableModule,
//         ScrollingModule,
//         MatCheckboxModule,
//         DragDropModule,
//         SweetAlert2Module.forRoot(),
//         // DndModule,
//         MatToolbarModule,
//         QuillModule.forRoot(),
//         MatFabMenuModule,
//         MatTooltipModule,
//       ], providers: [
//         AuthGuard,
//         AuthService,
//         AdminGuard,
//         PaginationService,
//         LineLoginGuard,
//         LineloginService,
//         TemplateService,
//       ],
//       declarations: [ 
//         ReqCancelComponent,
//         AuthGuard,
//         AuthService,
//         AdminGuard,
//         PaginationService,
//         LineLoginGuard,
//         LineloginService,
//         TemplateService,]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ReqCancelComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
