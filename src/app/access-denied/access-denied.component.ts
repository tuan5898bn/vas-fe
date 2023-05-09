import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  constructor(
    private title: Title,
    private _router: Router,
    private _activeRoute: ActivatedRoute
  ) {
    title.setTitle("VAS-Access Denied")
  }
  callBack: any;
  ngOnInit(): void {
    this._activeRoute.queryParams.subscribe((res: any) => {
      this.callBack = res
    })
  }
  goToLogin() {
    this._router.navigate(['/login'], { queryParams: this.callBack })
  }
}
