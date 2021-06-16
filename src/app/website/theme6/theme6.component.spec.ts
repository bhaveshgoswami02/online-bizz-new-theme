import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Theme6Component } from './theme6.component';

describe('Theme6Component', () => {
  let component: Theme6Component;
  let fixture: ComponentFixture<Theme6Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
