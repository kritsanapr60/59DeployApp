import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { PriorityStatus } from 'src/app/priority-status.enum';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.less']
})

export class RejectComponent implements OnInit {
  UserID: string;
  editorContent: string;
  EditorData: string;
  editorStyle = {
    height: '300px'
  };

  content = [];
  Data = [];
  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };
  editorForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public auth: AuthService,
    private afs: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
  }

  onSubmit() {
    //console.log(this.editorForm.get('editor').value);
  }

  saveDataEditor(e) {
    this.EditorData = e.html;
  }

  UpdateData() {
    this.afs.collection('ReqInformation').doc(this.data['idDoc']).update(
      {
        Status: 'reject',
      Priority : PriorityStatus.Accept,

        AdminName: this.auth.nameAdmin,
        TimeAdmin: firebase.firestore.FieldValue.serverTimestamp(),
        message: this.EditorData
      });
  }
}
