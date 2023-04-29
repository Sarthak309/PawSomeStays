import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ServiceComponent } from './service/service.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [{
    path: 'registration',
    component: RegistrationComponent
},{
    path: 'login',
    component: LoginComponent
},{
    path: 'home',
    component: HomeComponent
},{
    path: 'forgotPassword',
    component: ForgotPasswordComponent

},{
    path: 'service',
    component: ServiceComponent
},{
    path: '',redirectTo:'registration',pathMatch:'full'
}];

@NgModule({
    imports:[RouterModule.forRoot(routes),CommonModule],
    exports: [RouterModule]
})


export class AppRoutingModule { }
