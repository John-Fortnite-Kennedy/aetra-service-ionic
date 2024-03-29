import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-finishedrequests',
  templateUrl: './finishedrequests.page.html',
  styleUrls: ['./finishedrequests.page.scss'],
})
export class FinishedrequestsPage implements OnInit {

  admin_access_data;

  constructor(public router: Router, public api: ApiService) { 

    // Configure router
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';

    if (sessionStorage.getItem("manager_access_data") === null) {
      this.router.navigateByUrl('/gate')
    }

    // Get access data from session
    this.admin_access_data = JSON.parse(sessionStorage.getItem("manager_access_data"))
    console.log(this.admin_access_data)

    this.api.myjwt = this.admin_access_data.jwt
    this.api.router = this.router

  }

  ngOnInit() {

  }

  navigate(url){
    this.router.navigateByUrl(url);
  }

  leave() {
    sessionStorage.removeItem('manager_access_data');
    this.router.navigateByUrl('/login');
  }

}
