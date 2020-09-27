import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AdminItem } from '../adminDashboard/Template/admin-item';
import { TemplateOneComponent } from '../adminDashboard/Template/template-one/template-one.component';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  formContent;
  constructor(private afs: AngularFirestore) { }
  // adminTemplate() {
  //   this.formContent = this.afs
  //     .collection('ImageFlexMessage')
  //     .snapshotChanges()
  //     .pipe(
  //       map((item) =>
  //         item.map((i) => ({
  //           id: i.payload.doc.id,
  //           data: i.payload.doc.data(),
  //         }))
  //       )
  //     );
  //   // console.log('formContent:', this.formContent);
  // }

  getAds() {
    return [
      new AdminItem(TemplateOneComponent, this.formContent),
    ];
  }

  readData() {
    return this.afs
      .collection('AdminTemplate')
      .doc('AdminTemplateFormationItem')
      .valueChanges();
  }
  
  readFormImportData() {
    return this.afs
      .collection('FormImportData')
      .doc('tbfkMRzrWlTb2It3to9S')
      .valueChanges();
  }
}
