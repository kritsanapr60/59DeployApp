
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DialogExampleComponent } from './form/dialog-example/dialog-example.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { MatButtonModule } from '@angular/material/button';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { AdminGuard } from './services/admin.guard';
import { ScrollableDirective } from './form/scrollable.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { PaginationService } from './form/pagination.service';
import { MaterialModule } from './material/material.module';
import { DndModule } from 'ngx-drag-drop';
import { ConfirmationDialogComponent } from './form/confirmation-dialog/confirmation-dialog.component';
import { AddFormComponent } from './form/add-form/add-form.component';
import { ConsentformComponent } from './consentform/consentform/consentform.component';
import { QuillModule } from 'ngx-quill';
import { LineGetTokensComponent } from './line/line-get-tokens/line-get-tokens.component';
import { LineLoginGuard } from './line/line-login.guard';
import { ReadConsentComponent } from './consentform/read-consent/read-consent.component';
import { LineloginService } from './services/linelogin.service';
import { UserFormComponent } from './form/user-form/user-form.component';
import { InformationComponent } from './line/information/information.component';
import { DashboardComponent } from './line/dashboard/dashboard.component';
import { EditUserFormComponent } from './form/edit-user-form/edit-user-form.component';
import { AdminConfirmComponent } from './admin-confirm/admin-confirm.component';
import { AcceptComponent } from './admin-confirm/accept/accept.component';
import { RejectComponent } from './admin-confirm/reject/reject.component';
import { DropzoneDirective } from './admin-confirm/dropzone.directive';
import { UploadTaskComponent } from './admin-confirm/upload-task/upload-task.component';
import { ReqCopyComponent } from './admin/req-copy/req-copy.component';
import { ReqCancelComponent } from './admin/req-cancel/req-cancel.component';
import { ViewFormComponent } from './adminDashboard/view-form/view-form.component';
import { AdminDashboardComponent } from './adminDashboard/admin-dashboard/admin-dashboard.component';
import { CancelGivingInformationComponent } from './adminDashboard/cancel-giving-information/cancel-giving-information.component';
import { DialogEditorComponent } from './adminDashboard/dialog-editor/dialog-editor.component';
import { UserCancelComponent } from './line/user-cancel/user-cancel.component';
import { PersonalInformationComponent } from './line/personal-information/personal-information.component';
import { RequestPersonalInformationComponent } from './adminDashboard/request-personal-information/request-personal-information.component';

import { AdminImportDataComponent } from './adminDashboard/admin-import-data/admin-import-data.component';
import { ShowFormImportDataComponent } from './adminDashboard/show-form-import-data/show-form-import-data.component';
import { SlugifyPipe } from 'src/app/adminDashboard/fill-out-form/slugify.pipe';
import { FillOutFormComponent } from './adminDashboard/fill-out-form/fill-out-form.component';
import { UserImportDataComponent } from './line/user-import-data/user-import-data.component';
import { CreateFormContentComponent } from './form/create-form-content/create-form-content.component';
import { ViewFormContentComponent } from './adminDashboard/view-form-content/view-form-content.component';
import { AdminTemplateComponent } from './adminDashboard/Template/admin-template/admin-template.component';
import { TemplateOneComponent } from './adminDashboard/Template/template-one/template-one.component';
import { AdminTemplateDirective } from './adminDashboard/Template/admin-template.directive';
import { TemplateService } from './services/template.service';
import { CardFlexMessageComponent } from './FlexMessage/card-flex-message/card-flex-message.component';
import { ViewDetailFormImportDataComponent } from './adminDashboard/view-detail-form-import-data/view-detail-form-import-data.component';
import { AdminCreateTemplateComponent } from './adminDashboard/Template/admin-create-template/admin-create-template.component';
import { UserFormImportDataComponent } from './FlexMessage/user-form-import-data/user-form-import-data.component';
import { DialogForCardComponent } from './FlexMessage/dialog-for-card/dialog-for-card.component';
import { CreateTemplateFlexMessageComponent } from './FlexMessage/CreateTemplate/create-template-flex-message.component';
import { AddNodeComponent } from './FlexMessage/CreateTemplate/theme/add-node/add-node.component';
import { DeleteNodeComponent } from './FlexMessage/CreateTemplate/theme/delete-node/delete-node.component';
import { NodeDialogComponent } from './FlexMessage/CreateTemplate/theme/node-dialog/node-dialog.component';
/**
 * Main component
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    DialogExampleComponent,
    LoadingSpinnerComponent,
    AddFormComponent,
    ConfirmationDialogComponent,
    ConsentformComponent,
    LineGetTokensComponent,
    ReadConsentComponent,
    UserFormComponent,
    InformationComponent,
    DashboardComponent,
    EditUserFormComponent,
    AdminConfirmComponent,
    AcceptComponent,
    RejectComponent,
    UploadTaskComponent,
    ReqCopyComponent,
    ReqCancelComponent,
    AdminDashboardComponent,
    CancelGivingInformationComponent,
    DialogEditorComponent,
    UserCancelComponent,
    ViewFormComponent,
    PersonalInformationComponent,
    RequestPersonalInformationComponent,
    AdminImportDataComponent,
    ShowFormImportDataComponent,
    ScrollableDirective,
    SlugifyPipe,
    DropzoneDirective,
    AdminTemplateDirective,
    FillOutFormComponent,
    UserImportDataComponent,
    CreateFormContentComponent,
    ViewFormContentComponent,
    AdminTemplateComponent,
    TemplateOneComponent,
    CardFlexMessageComponent,
    ViewDetailFormImportDataComponent,
    AdminCreateTemplateComponent,
    UserFormImportDataComponent,
    DialogForCardComponent,
    CreateTemplateFlexMessageComponent,
    AddNodeComponent,
    DeleteNodeComponent,
    NodeDialogComponent,
  ],
  entryComponents: [
    DialogExampleComponent,
    ConfirmationDialogComponent,
    TemplateOneComponent,
    DialogForCardComponent,
    NodeDialogComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseApp),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    RouterModule,
    FlexLayoutModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    AngularFirestoreModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    CdkScrollableModule,
    ScrollingModule,
    MatCheckboxModule,
    DragDropModule,
    SweetAlert2Module.forRoot(),
    DndModule,
    MaterialModule,
    MatToolbarModule,
    QuillModule.forRoot(),
    MatFabMenuModule,
    MatTooltipModule,
  ],
  exports: [LoadingSpinnerComponent],
  providers: [
    AuthGuard,
    AuthService,
    AdminGuard,
    PaginationService,
    LineLoginGuard,
    LineloginService,
    TemplateService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
