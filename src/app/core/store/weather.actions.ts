import { createAction, props } from '@ngrx/store';
import { Forecast } from '../models/forecast.model';

export const loadForecast = createAction(
  '[Weather] Load Forecast',
  props<{ city: string }>()
);

export const loadForecastSuccess = createAction(
  '[Weather] Load Forecast Success',
  props<{ city: string; forecasts: Forecast[] }>()
);

export const loadForecastFailure = createAction(
  '[Weather] Load Forecast Failure',
  props<{ city: string; error: string }>()
);

export const clearForecast = createAction('[Weather] Clear Forecast');
