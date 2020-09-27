import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { TreeData } from '../CreateTemplate/service/tree-data.model';

interface Flex {
  FlexData: Array<TreeData[]>
}
@Component({
  selector: 'app-dialog-for-card',
  templateUrl: './dialog-for-card.component.html',
  styleUrls: ['./dialog-for-card.component.less']
})
export class DialogForCardComponent implements OnInit {

  cardData;
  valueFromFireStore;
  model;
  formID: string[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
    public afs: AngularFirestore,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.formID = this.data.split('_');

    const subFlex = this.afs.collection('FlexTemplete').doc(this.formID[0]).valueChanges().subscribe(
      (item: Flex) => {
        this.cardData = item.FlexData;
      },
      (err) => {
        console.error(err);
      },
      () => {
        subFlex.unsubscribe();
      }
    );
    const subFilloutFormData = this.afs
      .collection('FillOutForm')
      .doc(this.data)
      .valueChanges()
      .subscribe(
        (item) => {
          this.model = item;
        },
        (err) => {
          console.error(err);
        },
        () => {
          subFilloutFormData.unsubscribe();
        }
      );
  }

  safeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  checkFirestore(value: string) {
    if (value.includes('firestore')) {
      return this.model[value.split('firestore')[1]];
    }
    else {
      return value;
    }
  }

}
