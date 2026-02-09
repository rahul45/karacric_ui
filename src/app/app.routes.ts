import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlayersComponent } from './pages/players/players.component';
import { PlayerRegistrationComponent } from './pages/player-registration/player-registration.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'player-registration', component: PlayerRegistrationComponent },
  { path: '**', redirectTo: '' }
];
