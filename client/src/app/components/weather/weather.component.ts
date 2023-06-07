import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authentication.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class weatherComponent {

  golocationDenied: boolean = false;
  user: any;
  userChange: Subscription;

  weatherDetails: any;
  loading: boolean = false;

  constructor(private weatherService: WeatherService,
              private userService: AuthService) {
    this.userChange = this.userService.userChange
      .subscribe(user => { user && (this.user = user) });
  }

  ngOnInit(): void {
    this.getLocation();
  }

  ngOnDestroy(): void {
    this.userChange.unsubscribe();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      this.loading = true;

      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          const data = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }

          this.getweather(data);
        }
      },
      (error: any) => {
        this.golocationDenied = true;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getweather(data: any): void {
    this.weatherService.getweather(data)
      .subscribe(({ data }) => { this.weatherDetails = data.current_weather; this.loading = false });
  }

  get imageUrl(): string {
    const temp = this.weatherDetails.temperature
    const code = temp < 15 ? 'cold' : temp > 25 ? 'hot' : 'mid';

    return `/assets/${code}.jpg`;
  }
}
