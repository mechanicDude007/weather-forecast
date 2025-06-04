import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressLoaderComponent } from './progress-loader.component';
import { provideStore } from '@ngrx/store';
import { weatherReducer } from '../../store/weather.reducer';

describe('ProgressLoaderComponent', () => {
  let component: ProgressLoaderComponent;
  let fixture: ComponentFixture<ProgressLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressLoaderComponent],
      providers: [provideStore({ weather: weatherReducer })],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
