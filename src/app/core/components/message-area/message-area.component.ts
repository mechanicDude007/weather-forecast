import { Component, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherState } from '../../store/weather.state';
import {
  selectError,
  selectLoading,
  selectSelectedCity,
} from '../../store/weather.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-area',
  imports: [CommonModule],
  templateUrl: './message-area.component.html',
  styleUrl: './message-area.component.scss',
})
export class MessageAreaComponent {
  error: Signal<string | null>;
  selectedCity: Signal<string | null>;
  loading: Signal<boolean>;

  constructor(private store: Store<{ weather: WeatherState }>) {
    this.error = this.store.selectSignal(selectError);
    this.loading = this.store.selectSignal(selectLoading);
    this.selectedCity = this.store.selectSignal(selectSelectedCity);
  }
}
