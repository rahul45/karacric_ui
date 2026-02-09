import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    { icon: '🏆', title: 'Live Auctions', desc: 'Real-time bidding for cricket players' },
    { icon: '⚡', title: 'Fast Registration', desc: 'Join in just 5 minutes' },
    { icon: '🎯', title: 'Expert Analysis', desc: 'Performance metrics & stats' },
    { icon: '💰', title: 'Prize Pool', desc: 'Compete for massive rewards' }
  ];

  stats = [
    { number: '10K+', label: 'Active Players' },
    { number: '500+', label: 'Teams' },
    { number: '₹5Cr', label: 'Prize Money' },
    { number: '25+', label: 'Cities' }
  ];
}