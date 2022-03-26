import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Chart, registerables } from 'chart.js'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  admin_access_data

  linechart

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

    //retrieving data for activity chart
    this.getLineChartData()

  }

  getLineChartData(){

    var mymap = new Map();
    var chartdata = [];
    var labels = [];

    var today = new Date()
    var priorDate = new Date(new Date().setDate(today.getDate() - 30));
    for(var i  = 1; i<32; i++){
      var date = new Date(new Date().setDate(today.getDate() - (30-i))).toISOString().slice(5, 10);
      labels.push(date)
      mymap.set(date.toString(), 0);
    }

    var reqdata = {
      "start_time":new Date(priorDate.getTime() + (1000*60*60*6)).toISOString(),
      "end_time":new Date(today.getTime() + (1000*60*60*6)).toISOString(),
    }
    
    var response = this.api.sendPostRequestWithAuth(reqdata, "/admin/requests/all/between")
    response.subscribe(async data => {

      var request = data['payload']
      console.log(mymap)
      for(var i = 0; i<request.length; i++){
        var date = new Date(request[i].createdTime).toISOString().slice(5, 10)
        if( mymap.has(date.toString())){
          mymap.set(date.toString(), mymap.get(date.toString())+1);
        }
      }

      for (let [key, value] of mymap) {
        chartdata.push(value)
      }

      var charconf = {
        labels: labels,
        datasets: [{
          label: 'Количество Заявок',
          data: chartdata,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };


      var config: any = {
        type: 'line',
        data: charconf
      };

      Chart.register(...registerables);
      this.linechart = new Chart(this.lineCanvas.nativeElement, config);
      

    }, error => {
      this.api.apiErrorHandlingManager(error)
    })
  }

  ngOnInit() {
  }

}
