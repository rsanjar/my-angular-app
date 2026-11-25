import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyUserTasks } from '../../../../core/data/dummy-tasks';
import { UserTask } from './user-task';

describe('UserTask', () => {
  let component: UserTask;
  let fixture: ComponentFixture<UserTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTask);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('userTask', DummyUserTasks[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
