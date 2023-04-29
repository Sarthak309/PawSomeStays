import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})


export class ServiceComponent implements OnInit{
  constructor(private _router:Router,private _toastService: ToastService, private http: HttpClient){}
  
  appointments = []

  getAppointment(){
    this.http.post('http://localhost:3009/api/auth/appoints',{
      userid:this.userData._id
    }).subscribe( async (res:any) => {
      this.appointments = res.appointment;
      console.log(this.appointments)
    })
  }
  ngOnInit():void {
    this.getAppointment()

  }

  userData = JSON.parse(localStorage.getItem("janwar"))

  

  values ={
    userid:this.userData._id,
    training:"",
    grooming:"",
    medcare:"",
    socialize:"",
    playing:"",
    from:"",
    to:"",
    location:""
  }

  

  takeInput(event:any){
    this.values = {...this.values,[event.target.name]:event.target.value}
  }

  navigateBack(){
    this._router.navigate(['home'])
  }
  submitted(event:any){
    event.preventDefault()
    this.http.post('http://localhost:3009/api/auth/service',{
      value:this.values
    }).subscribe( async(res:any) => {
      console.log(res)
      this._toastService.info("Submiited Successfully")
    })
    this.getAppointment()
  }
  
}




