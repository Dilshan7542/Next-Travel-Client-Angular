import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./core/not-found/not-found.component";
import {AuthGuard} from "./service/guard/auth.guard";
import {pendingBookingGuard} from "./service/guard/pending-booking.guard";
import {travelCategoryResolver} from "./service/resolve/routing.resolver";





const routes:Routes=[
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"home",loadChildren:()=> import("../app/module/home/home.module").then(r => r.HomeModule),canActivateChild:[pendingBookingGuard],resolve:[travelCategoryResolver]},
  {path:"auth",loadChildren:()=>import('../app/module/auth/auth.module').then(r => r.AuthModule)},
  {path:"registered",loadChildren :()=> import("../app/module/registered/registered.module").then(r=>r.RegisteredModule),canActivate:[AuthGuard]},
  {path:"not-found",component:NotFoundComponent},
  {path:"**",redirectTo:"/not-found"}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
