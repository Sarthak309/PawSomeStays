import { Component } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email = ""
  code :any =123
  verifycode:any
  display= false
  userid:any
  pass= {
    password:"",
    cnpassword : ""
  }

  constructor (private http: HttpClient, private _router: Router, private _toastService: ToastService){}


  takeEmail(event:any){
    this.email = event.target.value
  }


  takeCode(event:any){
    this.code = event.target.value
  }

  verifyCode(event:any){
    event.preventDefault()
    
    if(this.code != this.verifycode){
      this._toastService.error("Invalid Code")
    }else{
      this.display = true
      this._toastService.success("CODE VERIFIED")
    }


  }


  takePass(event:any){
    this.pass = {...this.pass,[event.target.name]:event.target.value}

  }
  resetpass(event:any){
    event.preventDefault()
    console.log(this.pass)
    if (this.pass.password != this.pass.cnpassword){
      this._toastService.error("password do not match")
      return
    }
    this.http.post("http://localhost:3009/api/auth/resetpass",{
      password:this.pass.password,
      userid:this.userid
    }).subscribe( async(res:any)=>{
      this._toastService.success(res.msg)
    })
    this._router.navigate(['/login'])

  }

  submitted(event:any){
    event.preventDefault()
    this.http.post('http://localhost:3009/api/auth/forgotPass',{email:this.email
  }).subscribe(async(res:any)=>{
    if(res.status){
      this.verifycode = res.verifyCode
      this.userid = res.emailCheck._id
    }
    this._toastService.info(res.msg)
  })

  }

  







}
