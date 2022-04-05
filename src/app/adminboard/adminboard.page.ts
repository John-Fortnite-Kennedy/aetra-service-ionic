import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';


@Component({
  selector: 'app-adminboard',
  templateUrl: './adminboard.page.html',
  styleUrls: ['./adminboard.page.scss'],
})
export class AdminboardPage implements OnInit {

  currentRequests = [];

  admin_access_data;
  admin_personal_data;
  loaded = false;


  constructor(private menu: MenuController, public router: Router, public api: ApiService,  public modalCtrl: ModalController) { 

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

    // Get admins personal data
    var response = this.api.sendGetRequestWithAuth("/admin/managerdata")
    response.subscribe(data => {
      this.admin_personal_data = data['payload']
      console.log(this.admin_personal_data);

    }, error => {
      this.api.apiErrorHandlingManager(error)
    })

    this.connectToWebsocket()
  }

  connectToWebsocket(){
    var ws = webSocket('ws://185.22.64.115:4004/api/ws');

    ws.subscribe(
      msg => {
        var obj = JSON.parse(JSON.stringify(msg))
        console.log(obj)
        if(obj.payload){
          this.currentRequests = obj.payload;
          console.log(this.currentRequests);
          for(var i = 0; i < this.currentRequests.length; i++){
            
            this.filter(this.currentRequests[i]);
          }
        }else if(obj.insert){
          console.log(obj.insert)
          this.filter(obj.insert);
          this.currentRequests.unshift(obj.insert);
        }else if(obj.update){

          this.filter(obj.update);

          var index = this.currentRequests.findIndex(function(el) {
            return el.id == obj.update.id
          });

          this.currentRequests.splice(index, 1)
          this.currentRequests.unshift(obj.update);
          this.currentRequests.sort(function(a, b) {
            if (a.id < b.id) return 1;
            if (a.id > b.id) return -1;
            return 0;
          })     

        }
      }, // Called whenever there is a message from the server.

      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.

      () => {
        setInterval(this.connectToWebsocket, 5000)
      } // Called when connection is closed (for whatever reason).
    );
  }

  

  filter(item){
    item.createdTime = item.createdTime.replace('T',' ')
    item.createdTime = item.createdTime.replace('Z','')
    item.lastUpdatedTime = item.lastUpdatedTime.replace('T',' ')
    item.lastUpdatedTime = item.lastUpdatedTime.replace('Z','')

    if (item.spec.id.Valid == false) {
      item.badge = 8;
    } else {
      if (item.delayed == true) {
        item.badge = 7;
      } else {
        if (item.acceptedByManager == false) {
          item.badge = 1;
        } else if (item.acceptedByManager == true && item.acceptedBySpec == false) {
          item.badge = 2;
        } else if (item.acceptedByManager == true && item.acceptedBySpec == true && item.finishedBySpec == false) {
          item.badge = 3;
        } else if(item.acceptedByManager == true && item.acceptedBySpec == true && item.finishedBySpec == true && item.finishedByManager == false){
          item.badge = 4;
        } else if(item.acceptedByManager == true && item.acceptedBySpec == true && item.finishedBySpec == true && item.finishedByManager == true && item.acceptedByUser == false){
          item.badge = 5;
        } else if(item.acceptedByManager == true && item.acceptedBySpec == true && item.finishedBySpec == true && item.finishedByManager == true && item.acceptedByUser == true){
          item.badge = 6;
        }
      }
    }

  }

  openMenu(){
    this.menu.enable(true);
    this.menu.open();
  }

  onClose() {
    var fabs = document.querySelectorAll('ion-fab');
    for (var i = 0; i < fabs.length; i++) {
      fabs[i].activated = false;
    }
  }

  async call(val){
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: {
        'requestId': val
      },
      cssClass: 'transparent-modal',
      animated: true,
    });
    modal.present();
  }

  ngOnInit() {
    setTimeout(()=>{this.loaded=true},500);
  }

  directSpec(request_id){
    var response = this.api.sendGetRequestWithAuth("/admin/requests/accept/"+ request_id)
    response.subscribe(data=> {
      this.router.navigateByUrl('/adminboard')
    }, error=> {
      this.api.apiErrorHandlingManager(error)
    });
  }

  confirmRequest(request_id) {
    var response = this.api.sendGetRequestWithAuth("/admin/requests/finish/"+ request_id)
    response.subscribe(data=> {
      this.router.navigateByUrl('/adminboard')
    }, error=> {
      this.api.apiErrorHandlingManager(error)
    });
  }

}
