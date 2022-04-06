import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login;
  password;

  constructor(public api: ApiService, public router: Router) { }

  ngOnInit() {
    sessionStorage.removeItem('manager_access_data');
  }

  tryAuth(login, password){
    var data = {
      "login": login,
      "password": password
    }
    console.log(data)
    var response = this.api.sendPostRequest(data, "/common/login")
    response.subscribe(data => {
      sessionStorage.setItem('manager_access_data', JSON.stringify(data['payload']))
      console.log(data['payload'])
      this.router.navigateByUrl('/gate');
    }, error => {
      // Add if login and password is incorrect.
      this.api.errorHandler(error.status);
    })
  }

  validation_messages = {
    'login': [
      { type: 'required', message: 'Необходимо ввести почту.' },
      { type: 'pattern', message: 'Введите правильную почту.' }
    ],
    'password': [
      { type: 'required', message: 'Необходимо ввести пароль.' },
      { type: 'minlength', message: 'Пароль не может быть короче 5 символов.' }
      // { type: 'pattern', message: 'Пароль должен содержать как минимум 1 заглавную букву, 1 строчную букву и 1 число.' }
    ],
  }

}
