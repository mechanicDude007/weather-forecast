import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherState } from '../../store/weather.state';
import { ProgressLoaderComponent } from '../progress-loader/progress-loader.component';
import { MessageAreaComponent } from '../message-area/message-area.component';
import { CommonModule } from '@angular/common';
import * as WeatherActions from '../../store/weather.actions';
import { ForecastCardsComponent } from '../forecast-cards/forecast-cards.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ProgressLoaderComponent,
    MessageAreaComponent,
    ForecastCardsComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  cities = ['Birmingham', 'London', 'Cardiff'];

  constructor(private store: Store<{ weather: WeatherState }>) {}

  onCityChange(city: string): void {
    console.log(`[DashboardComponent] City selected: ${city}`);

    if (city === 'null') {
      // Check for the "Select a City" option
      this.store.dispatch(WeatherActions.clearForecast());
    } else {
      this.store.dispatch(WeatherActions.loadForecast({ city }));
    }
  }
}
