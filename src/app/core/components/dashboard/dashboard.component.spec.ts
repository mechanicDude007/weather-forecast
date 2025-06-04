import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { ProgressLoaderComponent } from '../progress-loader/progress-loader.component';
import { MessageAreaComponent } from '../message-area/message-area.component';
import { ForecastCardsComponent } from '../forecast-cards/forecast-cards.component';
import { provideStore } from '@ngrx/store';
import { weatherReducer } from '../../store/weather.reducer';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        CommonModule,
        ProgressLoaderComponent,
        MessageAreaComponent,
        ForecastCardsComponent,
      ],
      providers: [provideStore({ weather: weatherReducer })],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
