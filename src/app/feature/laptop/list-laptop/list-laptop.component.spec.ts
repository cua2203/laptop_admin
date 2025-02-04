import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLaptopComponent } from './list-laptop.component';

describe('LaptopComponent', () => {
  let component: ListLaptopComponent;
  let fixture: ComponentFixture<ListLaptopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLaptopComponent]
    });
    fixture = TestBed.createComponent(ListLaptopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
