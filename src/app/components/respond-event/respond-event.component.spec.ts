import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondEventComponent } from './respond-event.component';

describe('RespondEventComponent', () => {
  let component: RespondEventComponent;
  let fixture: ComponentFixture<RespondEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespondEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
