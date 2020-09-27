import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { PaginationService } from 'src/app/form/pagination.service';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DialogForCardComponent } from 'src/app/FlexMessage/dialog-for-card/dialog-for-card.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-detail-form-import-data',
  templateUrl: './view-detail-form-import-data.component.html',
  styleUrls: ['./view-detail-form-import-data.component.less'],
})
export class ViewDetailFormImportDataComponent implements OnInit {
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);

  formImportDataID: string;
  dataFillOutForm;
  displayedColumns: string[] = ['Form Name', 'Owner', 'star'];
  queryOption: string;
  myForm = this.fb.group({
    queryOption: '',
    searchOption: '',
    searchWord: ''
  });
  sortBtnEvent = true;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public page: PaginationService<Array<object>>,
    public dialog: MatDialog,
    public auth: AuthService,
    private afs: AngularFirestore,
    private location: Location,
    private readonly breakpointObserver: BreakpointObserver,

  ) {
    this.formImportDataID = this.route.snapshot.paramMap.get('formID');
    this.page.init('FillOutForm', 'formID', { where: this.formImportDataID });
    this.myForm.valueChanges.subscribe((item) => {
      this.queryOption = item.queryOption;
    });

  }

  ngOnInit(): void { }
  sortBy() {
    this.sortBtnEvent = !this.sortBtnEvent;
    console.log(this.queryOption);
    this.page.initWithSpecify('FillOutForm', 'formID',
      {
        where: this.formImportDataID,
        reverse: this.sortBtnEvent,
        prepend: false,
        orderBy: this.queryOption
      });
  }

  scrollHandler(e: any) {
    //console.log(e);
    if (e === 'bottom') {
      this.page.more();
    }
  }
  backClicked() {
    this.location.back();
  }

  openDialog(uID): void {
    const dialog = this.dialog.open(DialogForCardComponent, {
      width: 'calc(100% - 50px)',
      height: '90%',
      maxWidth: '100vw',
      panelClass: 'custom-modalbox',
      data: uID
    });
    const smallDialogSubscription = this.isExtraSmall.subscribe(size => {
      if (size.matches) {
        dialog.updateSize('100vw', '100vh');
      } else {
        dialog.updateSize('calc(100% - 50px)', '90%');
      }
    });
    dialog.afterClosed().subscribe(() => {
      smallDialogSubscription.unsubscribe();
    });
  }
}
