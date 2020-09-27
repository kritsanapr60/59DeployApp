import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPersonalInformationComponent } from './request-personal-information.component';

describe('RequestPersonalInformationComponent', () => {
  let component: RequestPersonalInformationComponent;
  let fixture: ComponentFixture<RequestPersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
