import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuperCategoriesComponent } from './super-categories.component';

describe('SuperCategoriesComponent', () => {
  let component: SuperCategoriesComponent;
  let fixture: ComponentFixture<SuperCategoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
