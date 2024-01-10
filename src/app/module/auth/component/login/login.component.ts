import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthCredential, AuthService} from "src/app/service/auth/auth.service";


@Component({
  selector:"auth-login",
  templateUrl:"login.component.html"
})
export class LoginComponent{

  constructor(private authService:AuthService) {
  }

  onSubmit(ngForm: NgForm) {
    const credential:AuthCredential=ngForm.value;
    console.log(credential);
    this.authService.getAuthService(credential);
  }
}
