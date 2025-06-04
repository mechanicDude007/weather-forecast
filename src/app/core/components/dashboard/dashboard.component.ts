import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherState } from '../../store/weather.state';
import { ProgressLoaderComponent } from '../progress-loader/progress-loader.component';
import { MessageAreaComponent } from '../message-area/message-area.component';
import { CommonModule } from '@angular/common';
import * as WeatherActions from '../../store/weather.actions';
import { ForecastCardsComponent } from '../forecast-cards/forecast-cards.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ProgressLoaderComponent,
    MessageAreaComponent,
    ForecastCardsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  cities = ['Birmingham', 'London', 'Cardiff'];

  constructor(private store: Store<{ weather: WeatherState }>) {}

  onCityChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Explicitly cast to HTMLSelectElement
    const city = selectElement.value; // Access 'value' property

    console.log(`[DashboardComponent] City selected: ${city}`);

    if (city === 'null') {
      // Check for the "Select a City" option
      this.store.dispatch(WeatherActions.clearForecast());
    } else {
      this.store.dispatch(WeatherActions.loadForecast({ city }));
    }
  }
}
