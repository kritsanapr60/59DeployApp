import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TemplateService } from 'src/app/services/template.service';
import { Field } from 'src/app/field';
import { Timestamp } from '@firebase/firestore';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogForCardComponent } from '../dialog-for-card/dialog-for-card.component';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

export interface AdminTemplateFormationItem {
  title: string;
  nameCreator: string;
  creator: string;
  version: number;
  attributes: Array<Field>;
  createDate: Timestamp;
}
@Component({
  selector: 'app-card-flex-message',
  templateUrl: './card-flex-message.component.html',
  styleUrls: ['./card-flex-message.component.less']
})
export class CardFlexMessageComponent implements OnInit {
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);

  formContent;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private template: TemplateService,
    public dialog: MatDialog,
    private readonly breakpointObserver: BreakpointObserver,
    // private breakpointObserver: BreakpointObserver
  ) {
  
    const paraMap = this.route.snapshot.paramMap;
    this.formId = paraMap.get('docID');
    console.log('docID', this.formId);

  }
  formId: string;
  temPlate: Array<Field>;


  matDialogRef: any;
  smallDialogSubscription: any;

  ngOnInit(): void {
    this.formContent = this.afs
      .collection('FillOutForm')
      .snapshotChanges()
      .pipe(
        map((item) =>
          item.map((i) => ({
            id: i.payload.doc.id,
            data: i.payload.doc.data(),
          }))
        )
      );

    const ProfileSub = this.afs
      .collection('FormImportData')
      .doc(this.formId)
      .collection('Template')
      .doc('CardTemplate')
      .valueChanges()
      .subscribe(
        (item: AdminTemplateFormationItem) => {
          this.temPlate = item.attributes;
          item.attributes.map((att) => {
            att.readOnly = true;
            // console.log('check att ref ', att.ref);
            if (!att.ref) {
              att.ref = 0;
            }
            // console.log(att);
          });
          // console.log('Field att', item);
        },
        (err) => {
          console.log(err);
        },
        () => {
          ProfileSub.unsubscribe();
        }
      );

    const ProfileSubEmpty = this.afs
      .collection('FormImportData')
      .doc(this.formId)
      .valueChanges()
      .subscribe(
        (item: AdminTemplateFormationItem) => {
          this.temPlate = item.attributes;
          item.attributes.map((att) => {
            att.readOnly = true;
            // console.log('check att ref ', att.ref);
            if (!att.ref) {
              att.ref = 0;
            }
            // console.log(att);
          });
          // console.log('Field att', item);
        },
        (err) => {
          console.log(err);
        },
        () => {
          ProfileSubEmpty.unsubscribe();
        }
      );
  }



  openDialog(uID): void {
    const dialog = this.dialog.open(DialogForCardComponent, {
      width: 'calc(100% - 50px)',
      height: '90%',
      maxWidth: '100vw',
      data: { formId: uID },
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
