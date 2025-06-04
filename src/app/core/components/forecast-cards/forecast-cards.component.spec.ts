import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastCardsComponent } from './forecast-cards.component';
import { provideStore } from '@ngrx/store';
import { weatherReducer } from '../../store/weather.reducer';

describe('ForecastCardsComponent', () => {
  let component: ForecastCardsComponent;
  let fixture: ComponentFixture<ForecastCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastCardsComponent],
      providers: [provideStore({ weather: weatherReducer })],
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
