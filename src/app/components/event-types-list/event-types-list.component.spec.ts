import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypesListComponent } from './event-types-list.component';

describe('EventTypesListComponent', () => {
  let component: EventTypesListComponent;
  let fixture: ComponentFixture<EventTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTypesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
