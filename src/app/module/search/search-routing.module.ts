import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SearchComponent} from "./search.component";
import {CommonChildComponent} from "./component/child-component/common-child.component";
import {AuthGuard} from "../../service/guard/auth.guard";
import {BookingResolverService} from "../../service/resolve/booking-resolver.service";
import {hotelAndVehicleResolver, travelAreaResolver} from "../../service/resolve/routing.resolver";


const routes:Routes=[
  {path:"",component:SearchComponent,children:[
    {path:"search/:location",component:CommonChildComponent,resolve:[hotelAndVehicleResolver]},
      {path:"booking",loadChildren:()=> import("../booking/booking.module").then(r=>r.BookingModule),canActivate:[AuthGuard],
        resolve:[BookingResolverService]}
    ],resolve:[travelAreaResolver]},
];
@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class SearchRoutingModule{}
