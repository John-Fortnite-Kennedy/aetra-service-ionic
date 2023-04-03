import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  phone;
  password;
  action = true;
  segmentValue ="Логин";

  constructor(public api: ApiService, public router: Router, private animationCtrl: AnimationController) { }

  ngOnInit() {
    sessionStorage.removeItem('manager_access_data');
  }

  tryAuth(phone, password){
    var data = {
      "login": phone,
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

  async swap(){
    if(this.action){
      this.slideR()
    } else {
      this.slideL()
    }
    await this.delay(500);
    this.action=!this.action;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  segmentChanged(e){
    console.log(e.detail.value)
    this.segmentValue = e.detail.value;
  }

  slideR() {
    let sign = document.getElementById('sign').getBoundingClientRect().width;
    let reg = document.getElementById('reg').getBoundingClientRect().width;
    let wrap = document.getElementById('wrap').getBoundingClientRect().width;
    //console.log(myElement.getBoundingClientRect().width)
    let slideRight = this.animationCtrl
      .create()
      .addElement(document.querySelector('.signIn'))
      .duration(1000)
      .fromTo('transform', 'translateX(0%)', 'translateX(calc(0% + '+(reg)+'px))')
    slideRight.play()

    let slideleft = this.animationCtrl
      .create()
      .addElement(document.querySelector('.signUp'))
      .duration(1000)
      .fromTo('transform', 'translateX(0%)', 'translateX(calc(100% - '+(wrap)+'px))')
      slideleft.play()
  }

  slideL() {
    let sign = document.getElementById('sign').getBoundingClientRect().width;
    let reg = document.getElementById('reg').getBoundingClientRect().width;
    let wrap = document.getElementById('wrap').getBoundingClientRect().width;
    //console.log(myElement.getBoundingClientRect().width)
    let slideRight = this.animationCtrl
      .create()
      .addElement(document.querySelector('.signIn'))
      .duration(1000)
      .fromTo('transform', 'translateX(calc(0% + '+(reg)+'px))', 'translateX(0%)')
    slideRight.play()

    let slideleft = this.animationCtrl
      .create()
      .addElement(document.querySelector('.signUp'))
      .duration(1000)
      .fromTo('transform', 'translateX(calc(100% - '+(wrap)+'px))', 'translateX(0%)')
      slideleft.play()
  }

}
