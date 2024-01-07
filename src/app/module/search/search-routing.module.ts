import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SearchComponent} from "./search.component";
import {CommonChildComponent} from "./component/child-component/common-child.component";
import {SearchResolverService} from "./service/search-resolver.service";

const routes:Routes=[
  {path:"",component:SearchComponent,children:[
    {path:"search/:location",component:CommonChildComponent,resolve:SearchResolverService},
  {path:":location/booking",loadChildren:()=> import("../booking/booking.module").then(r=>r.BookingModule)}
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
