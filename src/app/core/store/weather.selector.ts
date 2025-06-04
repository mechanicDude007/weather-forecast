import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.state';

export const selectWeatherState =
  createFeatureSelector<WeatherState>('weather');

export const selectSelectedCity = createSelector(
  selectWeatherState,
  (state) => state.selectedCity
);

export const selectForecasts = createSelector(
  selectWeatherState,
  (state) => state.forecasts
);

export const selectCityForecast = createSelector(
  selectForecasts,
  selectSelectedCity,
  (forecasts, city) => (city ? forecasts[city] || [] : []) //if has city then get forecast else return []
);

export const selectLoading = createSelector(
  selectWeatherState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectWeatherState,
  (state) => state.error
);
