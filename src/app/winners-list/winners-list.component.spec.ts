import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersListComponent } from './winners-list.component';

describe('WinnersListComponent', () => {
  let component: WinnersListComponent;
  let fixture: ComponentFixture<WinnersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinnersListComponent]
    });
    fixture = TestBed.createComponent(WinnersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
