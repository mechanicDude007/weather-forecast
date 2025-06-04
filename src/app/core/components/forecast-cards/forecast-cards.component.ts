import { Component, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherState } from '../../store/weather.state';
import { Forecast } from '../../models/forecast.model';
import {
  selectCityForecast,
  selectError,
  selectLoading,
} from '../../store/weather.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-cards.component.html',
  styleUrl: './forecast-cards.component.scss',
})
export class ForecastCardsComponent {
  forecastsForCity: Signal<Forecast[]>;
  loading: Signal<boolean>;
  error: Signal<string | null>;

  constructor(private store: Store<{ weather: WeatherState }>) {
    this.forecastsForCity = this.store.selectSignal(selectCityForecast);
    this.error = this.store.selectSignal(selectError);
    this.loading = this.store.selectSignal(selectLoading);
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
