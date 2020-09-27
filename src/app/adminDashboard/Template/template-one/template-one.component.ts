import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TemplateService } from 'src/app/services/template.service';
import { AdminComponent } from '../admin/admin.component';
@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.less']
})
export class TemplateOneComponent implements AdminComponent, OnInit {
  @Input() data: any;

  formContent = this.template.formContent;
  constructor(private afs: AngularFirestore, private template: TemplateService) { }

  ngOnInit(): void {
  }

}
