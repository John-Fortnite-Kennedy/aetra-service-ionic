import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  phone;
  allow = true;

  constructor(public router: Router, public api: ApiService) { }

  ngOnInit() {
  }
  
  auth(){
    var data = {
      "phone" : "+7"+this.phone
    }

    console.log("+7"+this.phone)

    var response = this.api.sendPostRequest(data ,"/common/auth")
    response.subscribe(data => {
      var temp = "+7"+this.phone

      sessionStorage.setItem('temp_user', JSON.stringify(temp))
      this.router.navigateByUrl('/codeconfirmation')

    }, error=> {
      
    });
  }

  check(){
    var tmp = this.phone.toString();
    //console.log(tmp);
    if(tmp.length==10){
      this.allow=false;
    } else {
      this.allow=true;
    }
  }

}
