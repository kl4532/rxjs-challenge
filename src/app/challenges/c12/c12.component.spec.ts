import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C12Component } from './c12.component';

describe('C12Component', () => {
  let component: C12Component;
  let fixture: ComponentFixture<C12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
