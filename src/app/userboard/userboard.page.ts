import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-userboard',
  templateUrl: './userboard.page.html',
  styleUrls: ['./userboard.page.scss'],
})
export class UserboardPage implements OnInit {

  username;
  usersurname

  userdata
  myrequests;

  constructor(public router: Router, public api: ApiService) { 
    // Configure router
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';

    if (sessionStorage.getItem('user_access_data') === null) {
      this.router.navigateByUrl("/auth");
    }

    // Getting access data
    var user_access_data = JSON.parse(sessionStorage.getItem('user_access_data'))
    console.log(user_access_data)

    this.api.myjwt = user_access_data.jwt
    this.api.router = this.router

    var response = this.api.sendGetRequestWithAuth("/user/userdata")
    response.subscribe(data => {
      console.log(data);
      this.userdata = data['payload']

      // Now I can get requests of my current user!
      var response = this.api.sendGetRequestWithAuth("/user/requests/"+this.userdata.id)
      response.subscribe(data => {
        console.log(data);
        this.myrequests = data['payload']
        for(var item of this.myrequests){
          this.filter(item)
        }
      }, error => {
        this.api.apiErrorHandlingUser(error)
      })
      
    }, error => {
      this.api.apiErrorHandlingUser(error)
    })
  }

  save(){
    var data = {
      "name":this.username,
      "surname":this.usersurname
    }
    var response = this.api.sendPatchRequestWithAuth(data, "/user/updateNameSurname/"+this.userdata.id)
    response.subscribe(data=>{
      console.log(data['payload'])
      window.location.reload()
    }, error=>{
      this.api.apiErrorHandlingUser(error)
    })

  }

  accept(request_id){
    var response = this.api.sendGetRequestWithAuth("/user/accept/"+ request_id)
      response.subscribe(data=> {
        console.log(data['payload'])
        this.router.navigateByUrl('/userboard')
      }, error=> {
        this.api.apiErrorHandlingUser(error)
    });
  }

  filter(item){
    if(item.acceptedByManager==false){
      item.response_text = 'Ваша заявка отправлена диспетчеру!';
      item.badge=1;
    }else if(item.acceptedByManager==true && item.acceptedBySpec==false){
      item.response_text = 'Ваша заявка отправлена специалисту!';
      item.badge=2;
    }else if(item.acceptedByManager==true && item.acceptedBySpec==true && item.finishedBySpec==false){
      item.response_text = 'Специалист принял вашу заявку!';
      item.badge=2;
    }else if(item.acceptedByManager==true && item.acceptedBySpec==true && item.finishedBySpec==true && item.finishedByManager==false){
      item.response_text = 'Специалист выполнил заявку, ждем подтверждения диспетчера!';
      item.badge=2;
    }else if(item.acceptedByManager==true && item.acceptedBySpec==true && item.finishedBySpec==true && item.finishedByManager==true && item.acceptedByUser==false){
      item.response_text = 'Подтвердите выполнение заявки!';
      item.badge=3;
    }else if(item.acceptedByManager==true && item.acceptedBySpec==true && item.finishedBySpec==true && item.finishedByManager==true && item.acceptedByUser==true){
      item.response_text = 'Выполнено!';
      item.badge=4;
    }
  }

  ngOnInit() {
  }

}
