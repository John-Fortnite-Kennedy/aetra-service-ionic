import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  requestId: any;
  admin_access_data;
  allSpecs;
  requestInfo;
  loaded: boolean = false;

  specId;

  constructor(public router: Router, public api: ApiService,  public modalCtrl: ModalController) {
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
    var response = this.api.sendGetRequest("/common/allSpecs")
    response.subscribe(data =>{
      this.allSpecs = data['payload']
      console.log(this.allSpecs)
    }, error=>{
      
    })
    var response = this.api.sendGetRequestWithAuth("/admin/requests/get/extended/"+this.requestId)
    response.subscribe(data =>{
      this.requestInfo = data['payload']
      this.loadFiles(this.requestInfo)
      console.log(this.requestInfo)

    }, error=>{
      
    })
    this.loaded=true;
  }

  setSpec(requestId, specId) {
    var data = {
      "spec_id" : parseInt(specId),
    }
    console.log(data)
    var response = this.api.sendPatchRequestWithAuth(data, "/admin/requests/setSpec/" + requestId)
    response.subscribe(data=>{
      this.modalCtrl.dismiss()
    }, error => {
      this.api.apiErrorHandlingManager(error)
    })
  }

  loadFiles(item){
    var response = this.api.sendGetRequest("/common/getAllFilesByRequestId/"+item.id)
    response.subscribe(data => {
      item.fileUrl = "http://185.22.64.115:4004/api/"+data['payload'][0].path
    })
  }
}
