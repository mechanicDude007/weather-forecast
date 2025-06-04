import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Forecast } from '../models/forecast.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_KEY = environment.weatherApiKey;
  private readonly BASE_URL = environment.weatherApiUrl;

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<Forecast[]> {
    const url = `${this.BASE_URL}?q=${city}&units=metric&appid=${this.API_KEY}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        return this.handleResponseData(response);
      }),
      catchError((err: HttpErrorResponse) =>
        throwError(() => this.handleApiError(err, city))
      )
    );
  }

  handleResponseData(response: any): Forecast[] {
    const dailyMap = new Map<string, Forecast>();
    response.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyMap.has(date) && dailyMap.size < 5) {
        //taking the first forecast of the day
        dailyMap.set(date, {
          date,
          temperature: item.main.temp,
          windspeed: item.wind.speed,
          description: item.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        });
      }
    });
    const forecasts = Array.from(dailyMap.values()).slice(0, 5);
    return forecasts;
  }

  handleApiError(error: HttpErrorResponse, city: string): string {
    let message = 'An unexpected error occurred.';
    if (error.status === 404) {
      message = `City "${city}" not found. Please check the city name.`;
    } else if (error.status === 401) {
      message = `Invalid API key. Please check your OpenWeatherMap API key or API usage limits.`;
    } else if (error.status === 429) {
      message = `API rate limit exceeded. Please try again later.`;
    } else if (error.status >= 500) {
      message = `Server error (${error.status}). Please try again later.`;
    } else if (error.message) {
      message = error.message;
    } else {
      message = JSON.stringify(error); // for unhandled error shapes
    }
    return message;
  }
}
