import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Player } from '../../services/data.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit {
  searchTerm = '';
  selectedRole = '';
  players: Player[] = [];
  allPlayers: Player[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Subscribe to players from service
    this.dataService.getPlayers().subscribe(players => {
      this.allPlayers = players;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.players = this.allPlayers.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchRole = !this.selectedRole || p.role === this.selectedRole;
      return matchSearch && matchRole;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onRoleChange(): void {
    this.applyFilters();
  }

  get roles(): string[] {
    return [...new Set(this.allPlayers.map(p => p.role))];
  }

  deletePlayer(id: number): void {
    if (confirm('Are you sure you want to delete this player?')) {
      this.dataService.deletePlayer(id);
    }
  }

  exportPlayers(): void {
    this.dataService.exportPlayersAsJSON();
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/400x400?text=Player+Image';
  }
}