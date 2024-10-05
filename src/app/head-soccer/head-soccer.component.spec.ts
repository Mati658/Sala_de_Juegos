import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadSoccerComponent } from './head-soccer.component';

describe('HeadSoccerComponent', () => {
  let component: HeadSoccerComponent;
  let fixture: ComponentFixture<HeadSoccerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadSoccerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadSoccerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
