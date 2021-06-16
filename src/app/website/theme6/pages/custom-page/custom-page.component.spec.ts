import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomPageComponent } from './custom-page.component';

describe('CustomPageComponent', () => {
  let component: CustomPageComponent;
  let fixture: ComponentFixture<CustomPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
