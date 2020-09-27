import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGetTokensComponent } from './line-get-tokens.component';

describe('LineGetTokensComponent', () => {
  let component: LineGetTokensComponent;
  let fixture: ComponentFixture<LineGetTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineGetTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineGetTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
