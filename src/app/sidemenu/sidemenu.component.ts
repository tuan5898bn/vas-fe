import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogged } from '../models/UserLogged';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor(
    private authenticateService: AuthenticateService,
    private router: Router
  ) { }

  userLogged: UserLogged;

  ngOnInit(): void {
    this.authenticateService.getCurrentLogged().subscribe((data: any) => {
      this.userLogged = data;
    })
  }

  onSignOut() {
    this.authenticateService.logout();
    this.router.navigate(['/login'])
  }


}
