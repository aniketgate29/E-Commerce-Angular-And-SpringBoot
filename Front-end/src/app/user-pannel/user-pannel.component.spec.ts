import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPannelComponent } from './user-pannel.component';

describe('UserPannelComponent', () => {
  let component: UserPannelComponent;
  let fixture: ComponentFixture<UserPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPannelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
