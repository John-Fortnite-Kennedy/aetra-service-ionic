import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-allrequests',
  templateUrl: './allrequests.page.html',
  styleUrls: ['./allrequests.page.scss'],
})
export class AllrequestsPage implements OnInit {

  admin_access_data
  admin_personal_data

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

}
