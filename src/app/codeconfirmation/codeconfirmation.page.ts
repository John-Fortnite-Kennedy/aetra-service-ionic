import { Component, OnInit, ViewChild } from '@angular/core';
import {CodeInputComponent} from 'angular-code-input';

@Component({
  selector: 'app-codeconfirmation',
  templateUrl: './codeconfirmation.page.html',
  styleUrls: ['./codeconfirmation.page.scss'],
})
export class CodeconfirmationPage implements OnInit {

  @ViewChild('codeInput') codeInput !: CodeInputComponent;

  timerCheck: boolean = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.timerCheck = true, 60000);
  }

  reCall(){
    
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
  }

}
