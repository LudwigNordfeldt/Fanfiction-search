import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanfictionReadComponent } from './fanfiction-read.component';

describe('FanfictionReadComponent', () => {
  let component: FanfictionReadComponent;
  let fixture: ComponentFixture<FanfictionReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FanfictionReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FanfictionReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
