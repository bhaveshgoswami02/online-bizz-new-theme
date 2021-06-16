import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyShippmentsComponent } from './my-shippments.component';

describe('MyShippmentsComponent', () => {
  let component: MyShippmentsComponent;
  let fixture: ComponentFixture<MyShippmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyShippmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShippmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
