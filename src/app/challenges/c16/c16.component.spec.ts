import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C16Component } from './c16.component';

describe('C16Component', () => {
  let component: C16Component;
  let fixture: ComponentFixture<C16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C16Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
