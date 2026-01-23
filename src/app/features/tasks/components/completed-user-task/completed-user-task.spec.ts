import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedUserTask } from './completed-user-task';

describe('CompletedUserTask', () => {
  let component: CompletedUserTask;
  let fixture: ComponentFixture<CompletedUserTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedUserTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedUserTask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
