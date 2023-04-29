import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  values ={}

  constructor (private http:HttpClient, private _toast:ToastService, private router:Router){}

  ngOnInit():void{
    if(!JSON.parse(localStorage.getItem("janwar"))){
      this.router.navigate(['/login'])
    }
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

takeInput(event:any){
  this.values = {...this.values,[event.target.name]:event.target.value}
  console.log(this.values)
}

onClick(event:any){
  event.preventDefault()
  this.http.post("http://localhost:3009/api/auth/feedback",{
    values:this.values
  }).subscribe( async(res:any)=>{
    this._toast.success(res.msg)
  })
  
}

}
