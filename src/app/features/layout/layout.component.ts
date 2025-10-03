import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStateService } from '../auth/state/auth-state.service';

@Component({
  selector: 'td-layout',
  imports: [RouterOutlet],
  template: `
    <nav class="navbar bg-body-secondary">
      <div class="container">
        <span class="navbar-brand">To-Do List App</span>
        <button
          class="btn btn-outline-primary"
          type="button"
          (click)="onLogout()">
          Log out
        </button>
      </div>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private readonly authSateService = inject(AuthStateService);

  onLogout() {
    this.authSateService.logout();
  }
}
