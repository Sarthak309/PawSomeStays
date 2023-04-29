import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {
values ={
  name:"",
  email:"",
  phnumber:"",
  spassword:"",
  cpassword:"",
  pname:"",
  ptype:"",
  pbreed:""
}

takeInput(event:any){
  this.values = {...this.values,[event.target.name]:event.target.value}
}

constructor (private http: HttpClient, private _router: Router, private _toastService: ToastService){}

onClick(event:any){
  event.preventDefault()
  console.log(this.values.name.length)
  if(this.values.name.length<3 || this.values.name.length>15){
    this._toastService.info('Name length should be 3 and 15');
    return
  }
  if(this.values.phnumber.length != 10){
    this._toastService.info('Invalid phone number length, It should be 10');
    return
  }
  if(this.values.spassword.length<8){
    this._toastService.info('Password length must be more than 8');
    return
  }
  if(this.values.cpassword != this.values.spassword){
    this._toastService.error('Write the Confirm Password as same as Set Password');
    return
  }

  // this._toastService.success('Succesfully Registered')
  this.http.post('http://localhost:3009/api/auth/registration',{
    value:this.values
  }).subscribe( async(res:any) => {

    if(res.status){
      localStorage.setItem('janwar',JSON.stringify(res.user))
      this._router.navigate(['home'])
    } else{
      alert(res.msg)
    }
  })
}

}


