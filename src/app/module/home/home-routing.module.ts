import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {CategoryComponent} from "./component/category/category.component";
import {SearchBarComponent} from "./component/search-bar/search-bar.component";
const route:Routes=[{path:"",component:HomeComponent,children:[
    {path:"",component:CategoryComponent},
    {path:"search/:id",component:SearchBarComponent},

  ]}];
@NgModule({
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]
})
export class HomeRoutingModule{

}
