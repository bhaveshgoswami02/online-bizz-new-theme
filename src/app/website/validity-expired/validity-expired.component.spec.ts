import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValidityExpiredComponent } from './validity-expired.component';

describe('ValidityExpiredComponent', () => {
  let component: ValidityExpiredComponent;
  let fixture: ComponentFixture<ValidityExpiredComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidityExpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidityExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
