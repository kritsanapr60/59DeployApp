import { EditUserFormComponent } from './form/edit-user-form/edit-user-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdminGuard } from './services/admin.guard';
import { AddFormComponent } from './form/add-form/add-form.component';
import { ConsentformComponent } from './consentform/consentform/consentform.component';
import { LineGetTokensComponent } from './line/line-get-tokens/line-get-tokens.component';
import { ReadConsentComponent } from './consentform/read-consent/read-consent.component';
import { UserFormComponent } from './form/user-form/user-form.component';
import { InformationComponent } from './line/information/information.component';
import { DashboardComponent } from './line/dashboard/dashboard.component';
import { AdminConfirmComponent } from './admin-confirm/admin-confirm.component';
import { AcceptComponent } from './admin-confirm/accept/accept.component';
import { RejectComponent } from './admin-confirm/reject/reject.component';
import { ReqCopyComponent } from './admin/req-copy/req-copy.component';
import { ReqCancelComponent } from './admin/req-cancel/req-cancel.component';
import { AdminDashboardComponent } from './adminDashboard/admin-dashboard/admin-dashboard.component';
import { ViewFormComponent } from './adminDashboard/view-form/view-form.component';
import { UserCancelComponent } from './line/user-cancel/user-cancel.component';
import { PersonalInformationComponent } from './line/personal-information/personal-information.component';
import { RequestPersonalInformationComponent } from './adminDashboard/request-personal-information/request-personal-information.component';
import { AdminImportDataComponent } from './adminDashboard/admin-import-data/admin-import-data.component';
import { ShowFormImportDataComponent } from './adminDashboard/show-form-import-data/show-form-import-data.component';
import { FillOutFormComponent } from './adminDashboard/fill-out-form/fill-out-form.component';
import { UserImportDataComponent } from './line/user-import-data/user-import-data.component';
import { CreateFormContentComponent } from './form/create-form-content/create-form-content.component';
import { ViewFormContentComponent } from './adminDashboard/view-form-content/view-form-content.component';
import { CardFlexMessageComponent } from './FlexMessage/card-flex-message/card-flex-message.component';
import { ViewDetailFormImportDataComponent } from './adminDashboard/view-detail-form-import-data/view-detail-form-import-data.component';
import { AdminCreateTemplateComponent } from './adminDashboard/Template/admin-create-template/admin-create-template.component';
import { UserFormImportDataComponent } from './FlexMessage/user-form-import-data/user-form-import-data.component';
import { CreateTemplateFlexMessageComponent } from './FlexMessage/CreateTemplate/create-template-flex-message.component';

const routes: Routes = [
  { path: 'admin', component: LoginAdminComponent },
  // admin
  {
    path: 'view',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: ViewFormComponent },
      { path: 'viewReqCopy', component: ReqCopyComponent },
      { path: 'viewReqCancel', component: ReqCancelComponent },
      { path: 'showFormImportData', component: ShowFormImportDataComponent },
      { path: 'reqPersonalInformation', component: RequestPersonalInformationComponent },
      { path: 'viewContent', component: ViewFormContentComponent },
      { path: 'viewDetailFormImport', component: ViewDetailFormImportDataComponent},
      { path: 'CreateTemplate', component: AdminCreateTemplateComponent },
      { path: 'CreateFlex', component: CreateTemplateFlexMessageComponent}
    ],
    //  canActivate: [AdminGuard]
  },
  { path: 'add/:id', component: AddFormComponent, canActivate: [] },
  { path: 'consent/:id', component: ConsentformComponent },
  { path: 'adminImportData', component: AdminImportDataComponent },
  // line
  {
    path: '',
    component: LineGetTokensComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'viewForm', component: ViewFormComponent },
      { path: 'information', component: InformationComponent, },
      { path: 'userCancel', component: UserCancelComponent, },
      { path: 'personalInformation', component: PersonalInformationComponent, },
      { path: 'ImportData', component: UserImportDataComponent, },
      { path: 'showFormImportData', component: UserFormImportDataComponent },
      { path: 'userTemplate', component: CardFlexMessageComponent },
      { path: 'viewDetailFormImport', component: ViewDetailFormImportDataComponent},
      { path: 'UserImportData', component: UserFormImportDataComponent}
    ],
  },
  { path: 'readConsent', component: ReadConsentComponent },
  { path: 'userform/:id', component: UserFormComponent, canActivate: [] },
  { path: 'edituserform/:id', component: EditUserFormComponent, canActivate: [], },
  { path: 'confirm', component: AdminConfirmComponent },
  { path: 'Accept', component: AcceptComponent },
  { path: 'Reject', component: RejectComponent },
  { path: 'FillOutForm', component: FillOutFormComponent },
  { path: 'createContent', component: CreateFormContentComponent },
  { path: 'CreateTemplate', component: AdminCreateTemplateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
