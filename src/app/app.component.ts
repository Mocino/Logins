import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces/AuthStatus.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  public finishedAuthCheck = computed<boolean>(() => {

    if(this.authService.autStatus() === AuthStatus.cheking) {
      return false;
    }
    return true;
  })


  public authStatusChangedEffect = effect(() => {
    console.log('authStatus:', this.authService.autStatus());

    switch(this.authService.autStatus()){
      case AuthStatus.cheking: return;

      case AuthStatus.authenticated: this.router.navigateByUrl('/dashboard'); return

      case AuthStatus.noAuthenticated: this.router.navigateByUrl('/auth/login'); return
    }
  })

}
