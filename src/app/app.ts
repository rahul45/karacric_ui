import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/header/app-header.component';
import { PlayerRegistrationComponent } from './pages/player-registration/player-registration.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, PlayerRegistrationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('karacric');
}
