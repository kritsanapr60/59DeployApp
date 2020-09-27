import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditorComponent } from './dialog-editor.component';

describe('DialogEditorComponent', () => {
  let component: DialogEditorComponent;
  let fixture: ComponentFixture<DialogEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
