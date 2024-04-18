import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemoryComponent } from './new-memory.component';

describe('NewMemoryComponent', () => {
  let component: NewMemoryComponent;
  let fixture: ComponentFixture<NewMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMemoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
