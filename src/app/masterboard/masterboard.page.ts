import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-masterboard',
  templateUrl: './masterboard.page.html',
  styleUrls: ['./masterboard.page.scss'],
})
export class MasterboardPage implements OnInit {

  master_access_data
  master_personal_data

  allrequests = []

  constructor(public api: ApiService, public router: Router) { 
    // Configure router
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';

    if (sessionStorage.getItem("manager_access_data") === null) {
      this.router.navigateByUrl('/gate')
    }

    // Get access data from session
    this.master_access_data = JSON.parse(sessionStorage.getItem("manager_access_data"))
    console.log(this.master_access_data)

    this.api.myjwt = this.master_access_data.jwt
    this.api.router = this.router

    // Get admins personal data
    var response = this.api.sendGetRequestWithAuth("/spec/managerdata")
    response.subscribe(data => {
      this.master_personal_data = data['payload']
      console.log(this.master_personal_data);

      // Get all requests
      var response = this.api.sendGetRequestWithAuth("/spec/acceptedRequests/extended/"+this.master_personal_data.spec_id.Int64)
      response.subscribe(async data => {
        console.log(data);
        this.allrequests = data['payload']

      }, error => {
        this.api.apiErrorHandlingManager(error)
      })
    }, error => {
      this.api.apiErrorHandlingManager(error)
    })
  }


  acceptRequest(request_id) {
    var response = this.api.sendGetRequestWithAuth("/spec/accept/"+ request_id)
    response.subscribe(data=> {
      this.router.navigateByUrl('/masterboard')
    }, error=> {
      this.api.apiErrorHandlingManager(error)
    });
  }

  confirmRequest(request_id) {
    var response = this.api.sendGetRequestWithAuth("/spec/finish/"+ request_id)
    response.subscribe(data=> {
      this.router.navigateByUrl('/masterboard')
    }, error=> {
      this.api.apiErrorHandlingManager(error)
    });
  }

  refresh(){
    window.location.reload();
  }

  leave() {
    sessionStorage.removeItem('manager_access_data');
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}
