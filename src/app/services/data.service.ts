import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Player {
  id: number;
  name: string;
  role: string;
  image: string;
  basePrice: number;
  experience: number;
  stats: string;
  email: string;
  phone: string;
  battingStyle: string;
  bowlingStyle: string;
  jerseyNumber: number;
  state?: string;
  city?: string;
  dateOfBirth?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private playersSubject = new BehaviorSubject<Player[]>([]);
  public players$ = this.playersSubject.asObservable();
  private readonly STORAGE_KEY = 'karacric_players';
  private readonly JSON_FILE = 'assets/data/players.json';

  // Default images for new players
  private defaultPlayerImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517849845537-1d51a20414de?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522099407257-a2b620e60db0?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519085360771-9852652951d3?w=400&h=400&fit=crop'
  ];

  constructor(private http: HttpClient) {
    this.loadPlayers();
  }

  /**
   * Load players from local storage first, if not available load from JSON
   */
  loadPlayers(): void {
    const storedPlayers = this.getPlayersFromStorage();
    
    if (storedPlayers && storedPlayers.length > 0) {
      this.playersSubject.next(storedPlayers);
    } else {
      this.loadPlayersFromJSON();
    }
  }

  /**
   * Load players from JSON file
   */
  private loadPlayersFromJSON(): void {
    this.http.get<{ players: Player[] }>(this.JSON_FILE).subscribe(
      (data) => {
        this.playersSubject.next(data.players);
        this.savePlayersToStorage(data.players);
      },
      (error) => {
        console.error('Error loading JSON file:', error);
      }
    );
  }

  /**
   * Get all players
   */
  getPlayers(): Observable<Player[]> {
    return this.players$;
  }

  /**
   * Get player by ID
   */
  getPlayerById(id: number): Player | undefined {
    return this.playersSubject.value.find(p => p.id === id);
  }

  /**
   * Add new player (form submission)
   */
  addPlayer(playerData: any): void {
    const currentPlayers = this.playersSubject.value;
    
    // Get random image from default images
    const randomImage = this.defaultPlayerImages[
      Math.floor(Math.random() * this.defaultPlayerImages.length)
    ];

    const newPlayer: Player = {
      id: Math.max(...currentPlayers.map(p => p.id), 0) + 1,
      name: playerData.fullName,
      role: playerData.role,
      image: randomImage,
      basePrice: 30, // Default base price
      experience: playerData.experience,
      stats: '⭐ New Player',
      email: playerData.email,
      phone: playerData.phone,
      battingStyle: playerData.battingStyle,
      bowlingStyle: playerData.bowlingStyle || 'N/A',
      jerseyNumber: playerData.jerseyNumber,
      state: playerData.state,
      city: playerData.city,
      dateOfBirth: playerData.dateOfBirth
    };

    const updatedPlayers = [...currentPlayers, newPlayer];
    this.playersSubject.next(updatedPlayers);
    this.savePlayersToStorage(updatedPlayers);
    this.updateJSONFile(updatedPlayers);

    console.log('Player added successfully:', newPlayer);
  }

  /**
   * Update existing player
   */
  updatePlayer(id: number, playerData: Partial<Player>): void {
    const currentPlayers = this.playersSubject.value;
    const updatedPlayers = currentPlayers.map(p => 
      p.id === id ? { ...p, ...playerData } : p
    );
    
    this.playersSubject.next(updatedPlayers);
    this.savePlayersToStorage(updatedPlayers);
    this.updateJSONFile(updatedPlayers);

    console.log('Player updated successfully');
  }

  /**
   * Delete player
   */
  deletePlayer(id: number): void {
    const currentPlayers = this.playersSubject.value;
    const updatedPlayers = currentPlayers.filter(p => p.id !== id);
    
    this.playersSubject.next(updatedPlayers);
    this.savePlayersToStorage(updatedPlayers);
    this.updateJSONFile(updatedPlayers);

    console.log('Player deleted successfully');
  }

  /**
   * Save players to local storage
   */
  private savePlayersToStorage(players: Player[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(players));
      console.log('Players saved to local storage');
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }

  /**
   * Get players from local storage
   */
  private getPlayersFromStorage(): Player[] | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from local storage:', error);
      return null;
    }
  }

  /**
   * Update JSON file (in real app, this would hit a backend API)
   * For now, we're simulating file update
   */
  private updateJSONFile(players: Player[]): void {
    // In a real application, you would send this to a backend API
    // Example: this.http.post('/api/players/save', { players }).subscribe(...)
    
    // For now, we're just logging and storing in localStorage
    console.log('Simulating JSON file update with players:', players);
    
    // You can implement this with a backend endpoint like:
    // this.http.post<any>('/api/players/update', { players }).subscribe(
    //   (response) => console.log('File updated:', response),
    //   (error) => console.error('Error updating file:', error)
    // );
  }

  /**
   * Export players as JSON (download)
   */
  exportPlayersAsJSON(): void {
    const players = this.playersSubject.value;
    const dataStr = JSON.stringify({ players }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'karacric-players.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Get players count
   */
  getPlayersCount(): number {
    return this.playersSubject.value.length;
  }

  /**
   * Search players
   */
  searchPlayers(query: string): Player[] {
    return this.playersSubject.value.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.email.toLowerCase().includes(query.toLowerCase())
    );
  }

  /**
   * Filter players by role
   */
  filterByRole(role: string): Player[] {
    return this.playersSubject.value.filter(p => p.role === role);
  }
}