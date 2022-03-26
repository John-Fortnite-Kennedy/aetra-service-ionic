import { Component, OnInit, ViewChild  } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-adminboard',
  templateUrl: './adminboard.page.html',
  styleUrls: ['./adminboard.page.scss'],
})
export class AdminboardPage implements OnInit {

  currentRequests = [];

  admin_access_data


  constructor(private menu: MenuController, public router: Router, public api: ApiService) { 

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
          this.filter(obj.insert);
          this.currentRequests.unshift(obj.insert);
        }else if(obj.update){
          this.filter(obj.update);
          this.currentRequests[obj.update.id] = obj.update
        }
      }, // Called whenever there is a message from the server.

      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.

      () => {
        setInterval(this.connectToWebsocket, 5000)
      } // Called when connection is closed (for whatever reason).
    );
  }

  filter(item){
    console.log(item);
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

    console.log(item);
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

  ngOnInit() {
  }

}
