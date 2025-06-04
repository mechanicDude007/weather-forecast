import { createReducer, on } from '@ngrx/store';
import { initialState } from './weather.state';
import * as WeatherActions from './weather.actions';

export const weatherReducer = createReducer(
  initialState,

  on(WeatherActions.clearForecast, (state) => ({ ...initialState })),

  on(WeatherActions.loadForecast, (state, { city }) => ({
    ...state,
    loading: true,
    error: null,
    selectedCity: city,
  })),

  on(WeatherActions.loadForecastSuccess, (state, { city, forecasts }) => ({
    ...state,
    loading: false,
    error: null,
    forecasts: { ...state.forecasts, [city]: forecasts },
  })),

  on(WeatherActions.loadForecastFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
