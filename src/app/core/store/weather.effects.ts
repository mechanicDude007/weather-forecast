import { Injectable } from '@angular/core';
import { WeatherState } from './weather.state';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../services/api.services';
import * as WeatherActions from './weather.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { selectForecasts } from './weather.selector';
@Injectable()
export class WeatherEffects {
  loadForecast$;

  constructor(
    private store: Store<WeatherState>,
    private actions$: Actions,
    private apiService: ApiService
  ) {
    this.loadForecast$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(WeatherActions.loadForecast),
        withLatestFrom(this.store.select(selectForecasts)),
        switchMap(([action, forecasts]) => {
          const { city } = action;

          if (forecasts && forecasts[city] && forecasts[city].length > 0) {
            //cached data
            return of(
              WeatherActions.loadForecastSuccess({
                city,
                forecasts: forecasts[city],
              })
            );
          }
          return this.apiService.getWeather(city).pipe(
            map((forecast) => {
              return WeatherActions.loadForecastSuccess({
                city,
                forecasts: forecast,
              });
            }),
            catchError((err) =>
              of(WeatherActions.loadForecastFailure({ city, error: err }))
            )
          );
        })
      );
    });
  }
}
