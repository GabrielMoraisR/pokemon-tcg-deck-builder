import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckFormComponent } from './deck-form.component';

describe('DeckFormComponent', () => {
  let component: DeckFormComponent;
  let fixture: ComponentFixture<DeckFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
