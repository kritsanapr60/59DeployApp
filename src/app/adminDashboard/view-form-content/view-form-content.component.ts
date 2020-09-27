import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { AdminItem } from '../Template/admin-item';
import { TemplateService } from 'src/app/services/template.service';
@Component({
  selector: 'app-view-form-content',
  templateUrl: './view-form-content.component.html',
  styleUrls: ['./view-form-content.component.less'],
})
export class ViewFormContentComponent implements OnInit {
  ads: AdminItem[];
  formContent;
  constructor(private afs: AngularFirestore, private template: TemplateService) { }

  ngOnInit(): void {
    this.ads = this.template.getAds();
    // this.formContent = this.afs
    //   .collection('ImageFlexMessage')
    //   .snapshotChanges()
    //   .pipe(
    //     map((item) =>
    //       item.map((i) => ({
    //         id: i.payload.doc.id,
    //         data: i.payload.doc.data(),
    //       }))
    //     )
    //   );
    // console.log('formContent ', this.formContent);

  }
}
