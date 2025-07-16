import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input() mode: 'login' | 'register' = 'login';
  @Output() formSubmitted = new EventEmitter<FormGroup>();

  form!: FormGroup;

  constructor(private fb: FormBuilder,  private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: [this.mode === 'register' ? '' : null],
      password: ['', Validators.required]
    });

    if (this.mode === 'login') {
      this.form.removeControl('email');
    }
  }

  submit(): void {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form);
      this.router.navigate(['/articles']);
    }
  }
}
