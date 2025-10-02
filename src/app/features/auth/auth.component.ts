import { Component, inject, OnDestroy } from '@angular/core';
import { AuthStateService } from './state/auth-state.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'td-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnDestroy {
  public loginForm: FormGroup;
  public loginError: string | null = null;
  private readonly authStateService = inject(AuthStateService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor() {
    this.loginForm = this.fb.group({
      email: new FormControl<string | null>(null, [Validators.required, Validators.email])
    });
  }

  public get email(): FormControl<string | null> {
    return this.loginForm.get('email') as FormControl<string | null>;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }    

    const email = this.loginForm.getRawValue();

    this.authStateService.login(email).pipe(
      takeUntil(this.unsubscribe$)).subscribe({
      next: (() => {
        this.loginError = null;
        this.router.navigate(['/tasks']);
      }),
      error: (err) => this.loginError = err.error.message
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
