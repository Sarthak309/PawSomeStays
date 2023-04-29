import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  values ={
    email:"",
    spassword:""
  }

  takeInput(event:any){
    this.values = {...this.values,[event.target.name]:event.target.value}
  }

  constructor (private http: HttpClient, private _router: Router, private _toastService: ToastService){}

  
  onClick(event:any){
    event.preventDefault()

    this.http.post('http://localhost:3009/api/auth/login',{
      value:this.values
    })
  .subscribe(async(res:any)=>{
      if(res.status){
        localStorage.setItem('janwar',JSON.stringify(res.emailNotThere))
        this._router.navigate(['home'])
      } else{
        alert(res.msg)
      }
    })

  }
}
