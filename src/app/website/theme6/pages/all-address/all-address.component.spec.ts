import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllAddressComponent } from './all-address.component';

describe('AllAddressComponent', () => {
  let component: AllAddressComponent;
  let fixture: ComponentFixture<AllAddressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
