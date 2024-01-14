import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {CategoryComponent} from "./component/category/category.component";
import {AuthGuard} from "../../service/guard/auth.guard";
import {BookingResolverService} from "../../service/resolve/booking-resolver.service";
const route:Routes=[{path:"",component:HomeComponent,children:[
    {path:"",component:CategoryComponent},
    {path:"search/:category",loadChildren:()=> import("../search/search.module").then(r=>r.SearchModule)},
    {path:"booking",loadChildren:()=> import("../booking/booking.module").then(r=>r.BookingModule),canActivate:[AuthGuard],resolve:[BookingResolverService]
      }

  ]}];
@NgModule({
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]
})
export class HomeRoutingModule{}
