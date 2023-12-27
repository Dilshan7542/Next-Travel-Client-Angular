import {NgModule} from "@angular/core";
import {LoginComponent} from "./component/login/login.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {SignComponent} from "./component/sign/sign.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {AuthComponent} from "./auth.component";
import {CommonModule} from "@angular/common";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations:[
    AuthComponent,
    LoginComponent,
    SignComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CommonModule, LoginComponent],
  providers:[],
})
export class AuthModule{

}
