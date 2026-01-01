import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  router = inject(Router);
  activeTab: number = 1;

  onLogout(){
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem("userid");
    this.router.navigateByUrl("/login");
  }

}
