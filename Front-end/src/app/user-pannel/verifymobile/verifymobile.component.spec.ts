import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifymobileComponent } from './verifymobile.component';

describe('VerifymobileComponent', () => {
  let component: VerifymobileComponent;
  let fixture: ComponentFixture<VerifymobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifymobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifymobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
