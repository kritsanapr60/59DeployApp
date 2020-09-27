import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelGivingInformationComponent } from './cancel-giving-information.component';

describe('CancelGivingInformationComponent', () => {
  let component: CancelGivingInformationComponent;
  let fixture: ComponentFixture<CancelGivingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelGivingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelGivingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
