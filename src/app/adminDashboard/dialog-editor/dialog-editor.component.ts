import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-editor',
  templateUrl: './dialog-editor.component.html',
  styleUrls: ['./dialog-editor.component.less'],
})
export class DialogEditorComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
  EditorData: string;

  ngOnInit(): void {}

  editorContent: string;
  editorStyle = {
    height: '300px',
  };
  content = [];

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  saveDataEditor(e){
    this.EditorData = e.html;
    //console.log(e.html);
  }
}
