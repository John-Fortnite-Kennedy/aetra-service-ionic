import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {CodeInputComponent} from 'angular-code-input';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-codeconfirmation',
  templateUrl: './codeconfirmation.page.html',
  styleUrls: ['./codeconfirmation.page.scss'],
})
export class CodeconfirmationPage implements OnInit {

  @ViewChild('codeInput') codeInput !: CodeInputComponent;

  temp_user;
  code;
  error_message: string;
  login_message: string;

  timerCheck: boolean = false;

  constructor(public router: Router, public api: ApiService) {
    this.temp_user = JSON.parse(sessionStorage.getItem('temp_user'))
    console.log(this.temp_user)
  }

  ngOnInit(): void {
    setTimeout(() => this.timerCheck = true, 60000);
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) { }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    // if(code!=this.temp_user.lastPhoneCode){
    //   this.code = "";
    //   let element = document.getElementById('screen');
    //   element.className = 'shakeit container p-sm-5 h-100 d-flex flex-column justify-content-center';
    // } else { }

    var data = {
      "phone" : this.temp_user,
      "code" : code
    }
    var temp
    console.log(data)

    var response = this.api.sendPostRequest(data ,"/common/codeConfirmation")
    response.subscribe(data=> {
      console.log(data['payload'])
      temp = data['payload']

      sessionStorage.setItem('user_access_data', JSON.stringify(temp))
      this.router.navigateByUrl('/userboard')
    }, error=> {
      if (error.staus == 401) {
        this.login_message = "Неверный код"
      }
    });
  }

  reCall() {
    var data = {
      "phone" : this.temp_user
    }
    console.log("data: ", data);
    console.log(this.temp_user);
    var response = this.api.sendPostRequest(data ,"/common/auth")
    response.subscribe(data => {
    }, error=> {
      this.error_message = this.api.errorHandler(error.status)
    });

    this.timerCheck = false;
    setTimeout(() => this.timerCheck = true, 60000);
  }

}
