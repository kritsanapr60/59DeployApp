import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadConsentComponent } from './read-consent.component';

describe('ReadConsentComponent', () => {
  let component: ReadConsentComponent;
  let fixture: ComponentFixture<ReadConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
