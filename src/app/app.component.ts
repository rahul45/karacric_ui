import { Component } from '@angular/core';
import { AppHeaderComponent } from './components/header/app-header.component';
import { PlayerRegistrationComponent } from './pages/player-registration/player-registration.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppHeaderComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}