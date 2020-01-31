import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheklistQuestionsComponent } from './cheklist-questions.component';

describe('CheklistQuestionsComponent', () => {
  let component: CheklistQuestionsComponent;
  let fixture: ComponentFixture<CheklistQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheklistQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheklistQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
