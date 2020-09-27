import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillOutFormComponent } from './fill-out-form.component';

describe('FillOutFormComponent', () => {
  let component: FillOutFormComponent;
  let fixture: ComponentFixture<FillOutFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillOutFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillOutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
