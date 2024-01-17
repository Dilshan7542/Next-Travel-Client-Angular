import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {SignComponent} from "./component/sign/sign.component";
import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared/shared.module";


const router:Routes=[
  {path:"",component:AuthComponent,children:[
      {path:"",component:LoginComponent},
      {path:"sign",component:SignComponent},
    ]},
];
@NgModule({
  imports:[RouterModule.forChild(router)],
  exports:[RouterModule,SharedModule]
})
export class AuthRoutingModule{}
