import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {CategoryComponent} from "./component/category/category.component";
const route:Routes=[{path:"",component:HomeComponent,children:[
    {path:"",component:CategoryComponent},
    {path:"search/:category",loadChildren:()=> import("../search/search.module").then(r=>r.SearchModule)},

  ]}];
@NgModule({
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]
})
export class HomeRoutingModule{}
