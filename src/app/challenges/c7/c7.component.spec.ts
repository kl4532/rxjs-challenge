import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C7Component } from './c7.component';

describe('C7Component', () => {
  let component: C7Component;
  let fixture: ComponentFixture<C7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
