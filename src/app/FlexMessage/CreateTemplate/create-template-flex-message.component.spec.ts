import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemplateFlexMessageComponent } from './create-template-flex-message.component';

describe('CreateTemplateFlexMessageComponent', () => {
  let component: CreateTemplateFlexMessageComponent;
  let fixture: ComponentFixture<CreateTemplateFlexMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTemplateFlexMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTemplateFlexMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
