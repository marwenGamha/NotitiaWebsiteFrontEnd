import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrComponent } from './userr.component';

describe('UserrComponent', () => {
  let component: UserrComponent;
  let fixture: ComponentFixture<UserrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
