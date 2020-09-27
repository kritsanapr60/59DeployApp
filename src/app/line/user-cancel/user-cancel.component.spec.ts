import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCancelComponent } from './user-cancel.component';

describe('UserCancelComponent', () => {
  let component: UserCancelComponent;
  let fixture: ComponentFixture<UserCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
