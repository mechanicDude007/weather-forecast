import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAreaComponent } from './message-area.component';
import { provideStore } from '@ngrx/store';
import { weatherReducer } from '../../store/weather.reducer';

describe('MessageAreaComponent', () => {
  let component: MessageAreaComponent;
  let fixture: ComponentFixture<MessageAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageAreaComponent],
      providers: [provideStore({ weather: weatherReducer })],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
