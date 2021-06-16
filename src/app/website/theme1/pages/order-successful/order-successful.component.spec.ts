import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderSuccessfulComponent } from './order-successful.component';

describe('OrderSuccessfulComponent', () => {
  let component: OrderSuccessfulComponent;
  let fixture: ComponentFixture<OrderSuccessfulComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSuccessfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
