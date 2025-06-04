import { Forecast } from '../models/forecast.model';

export interface WeatherState {
  selectedCity: string | null;
  loading: boolean;
  error: string | null;
  forecasts: {
    [city: string]: Forecast[];
  };
}

export const initialState: WeatherState = {
  selectedCity: null,
  loading: false,
  error: null,
  forecasts: {},
};
