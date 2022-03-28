import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.page.html',
  styleUrls: ['./create-request.page.scss'],
})
export class CreateRequestPage implements OnInit {

  requestForm: FormGroup;
  allSpecs: any[];
  error_code;
  file;
  zone_id: number;
  error_message: string;

  constructor(public api: ApiService,public router: Router, private activatedRoute: ActivatedRoute, public http: HttpClient, public formBuilder: FormBuilder) { 
    // Initially we get the zone id from get param of the link.
    this.activatedRoute.params.subscribe( params =>
      this.zone_id = Number(params['id'])
    );

    var response = this.api.sendGetRequest("/common/allSpecs")
    response.subscribe(data =>{
      this.allSpecs = data['payload']
      console.log(this.allSpecs)
    }, error=>{
      this.error_code = error.status
    });

    this.requestForm = this.formBuilder.group({
      spec_id: new FormControl('',
      ),
      // user_name: new FormControl('', Validators.compose([
      //   Validators.pattern('^[ЁёА-я a-zA-Z]+$'),
      // ]),
      // ),
      // user_surname: new FormControl('', Validators.compose([
      //   Validators.pattern('^[ЁёА-я a-zA-Z]+$'),
      // ]),
      // ),
      request_text: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[ЁёА-я a-zA-Z]+$'),
      ]),
      ),
      user_phone: new FormControl('', Validators.compose([
        Validators.required,
        //Validators.pattern('^[0-9]+$'),
        Validators.pattern('^[+0-9]+$'),
        Validators.maxLength(12),
        Validators.minLength(12)
      ]),
      ),
    });
  }

  ngOnInit() {
  }

  onFileUpload(event){
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

  requestCreate() {
    console.log(this.file)

    console.log(this.requestForm);

    var user_data

    var data = {
      "phone" : this.requestForm.controls['user_phone'].value //this.user_phone
    }

    var response = this.api.sendPostRequest(data, "/common/getByPhone")
    response.subscribe(data => {
      // if this user already exists on system, then create request using his id from user data.
      user_data = data['payload']
      console.log(user_data)

      var newdata = {
        "user_id": user_data.id,
        "text": this.requestForm.controls['request_text'].value, //this.request_text,
        "spec_id": parseInt(this.requestForm.controls['spec_id'].value), //parseInt(this.spec_id),
        "zone_id": this.zone_id
      }

      var response = this.api.sendPostRequest(newdata, "/common/newRequest")
      response.subscribe(data => {
        var request_id = data['payload']
        if(this.file!=null){
          this.http.post("http://185.22.64.115:4004/api/common/upload/"+this.file.name, this.file).subscribe(
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
        "phone": this.requestForm.controls['user_phone'].value //this.user_phone
      }

      var response = this.api.sendPostRequest(data, "/common/newUser")
      response.subscribe(data => {
        // Now, we have users data, and we can create new request.
        user_data = data['payload']
        console.log(user_data)

        var newdata = {
          "user_id": user_data,
          "text": this.requestForm.controls['request_text'].value, //this.request_text,
          "spec_id": parseInt(this.requestForm.controls['spec_id'].value), //parseInt(this.spec_id),
          "zone_id": this.zone_id
        }
        console.log(newdata)

        var response = this.api.sendPostRequest(newdata, "/common/newRequest")
        response.subscribe(data => {
          var request_id = data['payload']
          if(this.file!=null){
            this.http.post("http://185.22.64.115:4004/api/common/upload/"+this.file.name, this.file).subscribe(
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
