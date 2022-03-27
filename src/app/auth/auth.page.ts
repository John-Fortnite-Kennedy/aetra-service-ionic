import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  phone

  constructor(public router: Router, public api: ApiService) { }

  ngOnInit() {
  }
  
  auth(){
    var data = {
      "phone" : this.phone
    }

    console.log(this.phone)

    var response = this.api.sendPostRequest(data ,"/common/auth")
    response.subscribe(data => {
      var temp = this.phone

      sessionStorage.setItem('temp_user', JSON.stringify(temp))
      this.router.navigateByUrl('/codeconfirmation')

    }, error=> {
      
    });
  }

}
