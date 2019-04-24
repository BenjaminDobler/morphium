import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { State1Component } from './state1.component';

describe('State1Component', () => {
  let component: State1Component;
  let fixture: ComponentFixture<State1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ State1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(State1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
