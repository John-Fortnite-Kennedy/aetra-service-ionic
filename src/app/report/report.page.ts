import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { ApiService } from '../api.service';

export interface ReportData {
  requests;
  delayed;
  acceptedByManager;
  acceptedBySpec;
  finishedBySpec;
  finishedByManager;
  acceptedByUser;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  @ViewChild('report') el: ElementRef;

  admin_access_data;
  admin_personal_data;

  current_time: Date;
  after_time;
  before_time;
  saved_after_time;
  saved_before_time;

  allrequests;
  check;
  error_message: string;

  reportMap : Map<string, ReportData>

  constructor(public router: Router, public api: ApiService) { 
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
    
    // Get admins personal data
    var response = this.api.sendGetRequestWithAuth("/admin/managerdata")
    response.subscribe(data => {
      this.admin_personal_data = data['payload']
      console.log(this.admin_personal_data);
    }, error => {
      this.error_message = this.api.errorHandler(error.status)
      this.api.apiErrorHandlingManager(error)
    })

    // Get all requests
    this.getAllRequests()
  }

  ngOnInit() {

  }

  getAllRequests() {
    this.reportMap = null
    this.reportMap = new Map

    this.current_time = new Date()

    // Get all requests
    var response = this.api.sendGetRequestWithAuth("/admin/requests/all")
    response.subscribe(async data => {
      this.allrequests = data['payload']

      for(var item of this.allrequests){
        await this.getMydata(item);
      }

      console.log(this.reportMap)
      setTimeout(() => this.check=true, 500);
    }, error => {
      this.error_message = this.api.errorHandler(error.status)
      this.api.apiErrorHandlingManager(error)
    })
  }

  getNewRequests() {
    this.reportMap = null
    this.reportMap = new Map

    this.current_time = new Date()

    this.after_time = this.after_time + "T00:00:00Z"
    this.before_time = this.before_time + "T23:59:59Z"
    var data = {
      "start_time":this.after_time,
      "end_time":this.before_time
    }
    var response = this.api.sendPostRequestWithAuth(data, "/admin/requests/all/between")
    response.subscribe(async data => {
      this.allrequests = data['payload']

      for(var item of this.allrequests) {
        await this.getMydata(item);
      }

      setTimeout(() => this.check=true, 500);
    }, error => {
      this.error_message = this.api.errorHandler(error.status)
      this.api.apiErrorHandlingManager(error)
    })
  }

  refresh() {
    this.saved_after_time = this.after_time
    this.saved_before_time = this.before_time
    this.getNewRequests()
  }

  reset() {
    this.after_time = null
    this.before_time = null
    this.saved_after_time = null
    this.saved_before_time = null
    this.getAllRequests()
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

  makePDF() {
    var data = document.getElementById('report');
    html2canvas(data).then(canvas => {
      var imgWidth = 175;
      var imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 20;
      pdf.addImage(contentDataURL, 'PNG', 15, position, imgWidth, imgHeight)
      pdf.save('report.pdf'); // Generated PDF
    });
  }

  navigate(url){
    this.router.navigateByUrl(url);
  }

  leave() {
    sessionStorage.removeItem('manager_access_data');
    this.router.navigateByUrl('/login');
  }

  async getMydata(item) {
    // Get spec of the request
    var response = this.api.sendGetRequestWithAuth("/admin/specs/get/"+ item.spec_id.Int64)
    response.subscribe(data=> {
      item.spec = data['payload'];
      // Filling reportmap to show on pdf
      if(this.reportMap.has(item.spec.name)){

        var delay = 0;
        var acceptedByManager  = 0;
        var acceptedBySpec  = 0;
        var finishedBySpec  = 0;
        var finishedByManager  = 0;
        var acceptedByUser  = 0;
        if(item.delayed){
          delay = 1
        }
        if(item.acceptedByManager){
          acceptedByManager = 1
        }
        if(item.acceptedBySpec){
          acceptedBySpec = 1
        }
        if(item.finishedBySpec){
          finishedBySpec = 1
        }
        if(item.finishedByManager){
          finishedByManager = 1
        }
        if(item.acceptedByUser){
          acceptedByUser = 1
        }
        this.reportMap.get(item.spec.name).requests++;
        this.reportMap.get(item.spec.name).delayed = this.reportMap.get(item.spec.name).delayed + delay;
        this.reportMap.get(item.spec.name).acceptedByUser = this.reportMap.get(item.spec.name).acceptedByUser + acceptedByUser;
        this.reportMap.get(item.spec.name).acceptedByManager = this.reportMap.get(item.spec.name).acceptedByManager + acceptedByManager;
        this.reportMap.get(item.spec.name).acceptedBySpec = this.reportMap.get(item.spec.name).acceptedBySpec + acceptedBySpec;
        this.reportMap.get(item.spec.name).finishedByManager = this.reportMap.get(item.spec.name).finishedByManager + finishedByManager;
        this.reportMap.get(item.spec.name).finishedBySpec = this.reportMap.get(item.spec.name).finishedBySpec + finishedBySpec;
      }else{
        var delay = 0;
        var acceptedByManager  = 0;
        var acceptedBySpec  = 0;
        var finishedBySpec  = 0;
        var finishedByManager  = 0;
        var acceptedByUser  = 0;
        if(item.delayed){
          delay = 1
        }
        if(item.acceptedByManager){
          acceptedByManager = 1
        }
        if(item.acceptedBySpec){
          acceptedBySpec = 1
        }
        if(item.finishedBySpec){
          finishedBySpec = 1
        }
        if(item.finishedByManager){
          finishedByManager = 1
        }
        if(item.acceptedByUser){
          acceptedByUser = 1
        }
        let tmp : ReportData = {
          requests:1,
          delayed: delay,
          acceptedByUser: acceptedByUser,
          acceptedByManager: acceptedByManager,
          acceptedBySpec: acceptedBySpec,
          finishedByManager: finishedByManager,
          finishedBySpec: finishedBySpec
        }

        this.reportMap.set(item.spec.name, tmp)
      }

    }, error=> {
      this.error_message = this.api.errorHandler(error.status)
      this.api.apiErrorHandlingManager(error)
    });
  }

}
