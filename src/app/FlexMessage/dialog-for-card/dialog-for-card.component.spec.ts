import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForCardComponent } from './dialog-for-card.component';

describe('DialogForCardComponent', () => {
  let component: DialogForCardComponent;
  let fixture: ComponentFixture<DialogForCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogForCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogForCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
