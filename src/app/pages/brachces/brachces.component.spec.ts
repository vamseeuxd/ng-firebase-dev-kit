import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrachcesComponent } from './brachces.component';

describe('BrachcesComponent', () => {
  let component: BrachcesComponent;
  let fixture: ComponentFixture<BrachcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrachcesComponent]
    });
    fixture = TestBed.createComponent(BrachcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
