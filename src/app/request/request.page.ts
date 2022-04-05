import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  zoneId
  text
  specId

  phoneNumber

  file

  allSpecs

  error_message

  constructor(public router: Router, public route: ActivatedRoute, public api: ApiService, public http: HttpClient) { 
    
  }

  ngOnInit() {

    this.route.params.subscribe( params =>
      this.zoneId = Number(params['id'])
    );

    console.log(this.zoneId)

    // Getting all available specs to show in option list.
    var response = this.api.sendGetRequest("/common/allSpecs")
    response.subscribe(data =>{
      this.allSpecs = data['payload']
      console.log(this.allSpecs)
    }, error=>{
      
    })
    
  }

  fileUpload(event){
    this.file=event;
    alert("Файл успешно загружен!");
    console.log(this.file.target.files[0].name);

    let files: FileList = event.target.files;
    this.file = files[0]
    /*
    this.http.post("http://185.22.64.115:4004/common/upload/"+this.file.name, this.file).subscribe(
      (r)=>{console.log('got r', r)}
    )*/
  }

  newRequest() {
    console.log(this.file)

    var user_data

    var data = {
      "phone" : this.phoneNumber //this.user_phone
    }

    var response = this.api.sendPostRequest(data, "/common/getByPhone")
    response.subscribe(data => {
      // if this user already exists on system, then create request using his id from user data.
      user_data = data['payload']
      console.log(user_data)

      var newdata = {
        "user_id": user_data.id,
        "text": this.text,
        "spec_id": parseInt(this.specId), //parseInt(this.spec_id),
        "zone_id": this.zoneId
      }

      var response = this.api.sendPostRequest(newdata, "/common/newRequest")
      response.subscribe(data => {
        var request_id = data['payload']
        if(this.file!=null){
          this.http.post("http://localhost:4004/api/common/upload/"+this.file.name, this.file).subscribe(
            (r)=>{
              console.log(r['payload'])
              var data = {
                "file_id":r['payload'],
                "request_id":request_id
              }
              var response = this.api.sendPostRequest(data, "/common/addFileToRequest")
              response.subscribe(data=>{
                console.log(data['payload'])
              }, error=>{

              })
            }
          )
        }

        this.router.navigateByUrl("/auth");

      }, error => {
        this.error_message = this.api.errorHandler(error.status)
      })

    }, error => {
      // if user is not registered yet, we use user's phone number to create new user.
      this.error_message = this.api.errorHandler(error.status)

      var data = {
        "name": '',//this.requestForm.controls['user_name'].value, //this.user_name,
        "surname": '',//this.requestForm.controls['user_surname'].value, //this.user_surname,
        "phone": this.phoneNumber //this.user_phone
      }

      var response = this.api.sendPostRequest(data, "/common/newUser")
      response.subscribe(data => {
        // Now, we have users data, and we can create new request.
        user_data = data['payload']
        console.log(user_data)

        var newdata = {
          "user_id": user_data,
          "text": this.text, //this.request_text,
          "spec_id": parseInt(this.specId), //parseInt(this.spec_id),
          "zone_id": this.zoneId
        }
        console.log(newdata)

        var response = this.api.sendPostRequest(newdata, "/common/newRequest")
        response.subscribe(data => {
          var request_id = data['payload']
          if(this.file!=null){
            this.http.post("http://localhost:4004/api/common/upload/"+this.file.name, this.file).subscribe(
              (r)=>{
                console.log(r['payload'])
                var data = {
                  "file_id":r['payload'],
                  "request_id":request_id
                }
                var response = this.api.sendPostRequest(data, "/common/addFileToRequest")
                response.subscribe(data=>{
                  console.log(data['payload'])
                }, error=>{

                })
              }
            )
          }
          this.router.navigateByUrl("/auth");

        }, error => {
          this.error_message = this.api.errorHandler(error.status)
        })
      }, error => {
        this.error_message = this.api.errorHandler(error.status)
      })
    })

  }

}
