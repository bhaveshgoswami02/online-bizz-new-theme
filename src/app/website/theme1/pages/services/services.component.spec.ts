import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Theme2ServicesComponent } from './services.component';

describe('Theme2ServicesComponent', () => {
  let component: Theme2ServicesComponent;
  let fixture: ComponentFixture<Theme2ServicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme2ServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme2ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
