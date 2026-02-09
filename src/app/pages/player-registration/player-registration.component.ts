import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-player-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-registration.component.html',
  styleUrl: './player-registration.component.css'
})
export class PlayerRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dateOfBirth: ['', Validators.required],
      role: ['', Validators.required],
      battingStyle: ['', Validators.required],
      bowlingStyle: [''],
      experience: ['', [Validators.required, Validators.min(0)]],
      jerseyNumber: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.registrationForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly!';
      return;
    }

    try {
      // Add player to service
      this.dataService.addPlayer(this.registrationForm.value);
      
      this.successMessage = '✅ Registration successful! Your data has been saved.';
      
      // Reset form
      this.resetForm();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    } catch (error) {
      this.errorMessage = '❌ Error saving registration. Please try again.';
      console.error('Registration error:', error);
    }
  }

  resetForm(): void {
    this.registrationForm.reset();
    this.submitted = false;
  }
}