import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { DndModule } from 'ngx-drag-drop';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';

const MaterialComponents = [
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatMenuModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  FormsModule,
  MatTableModule,
  ReactiveFormsModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatListModule,
  // add drag and drop
  DndModule,
  SweetAlert2Module,
  // virtual scroll
  CdkScrollableModule,
  ScrollingModule,
  MatSnackBarModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatTreeModule,
  MatButtonToggleModule,
  MatGridListModule
];
@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]

})
export class MaterialModule { }
