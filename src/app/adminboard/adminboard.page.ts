import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-adminboard',
  templateUrl: './adminboard.page.html',
  styleUrls: ['./adminboard.page.scss'],
})
export class AdminboardPage implements OnInit {

  currentRequests = []

  constructor() { 
    this.connectToWebsocket()
  }

  connectToWebsocket(){
    var ws = webSocket('ws://185.22.64.115:4004/api/ws');

    ws.subscribe(
      msg => {
        var obj = JSON.parse(JSON.stringify(msg))
        console.log(obj)
        if(obj.payload){
          this.currentRequests = obj.payload
        }else if(obj.insert){
          this.currentRequests.unshift(obj.insert)
        }else if(obj.update){
          this.currentRequests[obj.update.id] = obj.update
        }
      }, // Called whenever there is a message from the server.

      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.

      () => {
        setInterval(this.connectToWebsocket, 5000)
      } // Called when connection is closed (for whatever reason).
    );
  }

  ngOnInit() {
  }

}
