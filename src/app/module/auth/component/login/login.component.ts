import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector:"auth-login",
  templateUrl:"login.component.html"
})
export class LoginComponent{

  onSubmit(ngForm: NgForm) {
    const credential:{email:string,pwd:string}=ngForm.value;
    console.log(credential);
  }
}
