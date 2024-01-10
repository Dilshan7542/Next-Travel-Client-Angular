import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SearchComponent} from "./search.component";
import {CommonChildComponent} from "./component/child-component/common-child.component";
import {SearchResolverService} from "../../service/resolve/search-resolver.service";
import {AuthGuard} from "../../service/guard/auth.guard";

const routes:Routes=[
  {path:"",component:SearchComponent,children:[
    {path:"search/:location",component:CommonChildComponent,resolve:[SearchResolverService]},
  {path:"booking",loadChildren:()=> import("../booking/booking.module").then(r=>r.BookingModule),canActivate:[AuthGuard]}
    ]},
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
