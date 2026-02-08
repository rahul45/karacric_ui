import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.css']
})
export class PlayerRegistrationComponent {
  registrationForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dateOfBirth: ['', Validators.required],
      role: ['', Validators.required],
      battingStyle: ['', Validators.required],
      bowlingStyle: [''],
      experience: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      jerseyNumber: ['', Validators.required]
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      console.log('Form Submitted:', this.registrationForm.value);
      alert('Registration successful!');
      this.registrationForm.reset();
      this.submitted = false;
    }
  }

  resetForm() {
    this.registrationForm.reset();
    this.submitted = false;
  }
}