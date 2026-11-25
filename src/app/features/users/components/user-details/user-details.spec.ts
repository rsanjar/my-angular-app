import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSampleData } from '../../../../core/data/dummy-users';
import { UserDetails } from './user-details';

describe('UserDetails', () => {
  let component: UserDetails;
  let fixture: ComponentFixture<UserDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('currentUser', UsersSampleData[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
