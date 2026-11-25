import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyUserTasks } from '../../../../core/data/dummy-tasks';
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

    const completedTasks = DummyUserTasks.filter((task) => task.isCompleted);
    fixture.componentRef.setInput('completedTaskList', completedTasks);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
