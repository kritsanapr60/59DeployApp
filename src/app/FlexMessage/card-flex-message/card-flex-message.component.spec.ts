import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFlexMessageComponent } from './card-flex-message.component';

describe('CardFlexMessageComponent', () => {
  let component: CardFlexMessageComponent;
  let fixture: ComponentFixture<CardFlexMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFlexMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFlexMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
