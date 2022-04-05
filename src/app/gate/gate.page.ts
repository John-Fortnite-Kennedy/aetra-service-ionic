import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gate',
  templateUrl: './gate.page.html',
  styleUrls: ['./gate.page.scss'],
})
export class GatePage implements OnInit {

  user

  constructor(public router: Router) { 
    
  }

  ngOnInit() {
    //if user is not logged in
    if(sessionStorage.getItem("manager_access_data") === null){
      this.router.navigateByUrl('/login')
    }else{
      this.user = JSON.parse(sessionStorage.getItem("manager_access_data"))
      if(this.user.role=="admin"){
        this.router.navigateByUrl('/adminboard')
      }else if(this.user.role=="spec"){
        this.router.navigateByUrl('/masterboard')
      }else if(this.user.role=="engineer"){
        this.router.navigateByUrl('/engineerboard')
      }
    }
  }

}
