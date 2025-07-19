import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  username: string | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.username = this.auth.getUsername();
  }

  logout(): void {
    this.auth.logout();
    window.location.href = '/login';  // Or use router.navigate
  }

}
