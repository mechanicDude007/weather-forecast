import { Component, Signal } from '@angular/core';
import { WeatherState } from '../../store/weather.state';
import { Store } from '@ngrx/store';
import { selectLoading } from '../../store/weather.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-loader.component.html',
  styleUrls: ['./progress-loader.component.scss'],
})
export class ProgressLoaderComponent {
  loading: Signal<boolean>;
  constructor(private store: Store<{ weather: WeatherState }>) {
    this.loading = this.store.selectSignal(selectLoading);
  }
}
