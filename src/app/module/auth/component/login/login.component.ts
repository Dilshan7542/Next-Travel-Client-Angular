import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthCredential, AuthService} from "src/app/service/auth/auth.service";
import {Customer, CustomerService} from "../../../../service/customer.service";


@Component({
  selector:"auth-login",
  templateUrl:"login.component.html"
})
export class LoginComponent{

  constructor(private authService:AuthService,private customerService:CustomerService) {
  }

  onSubmit(ngForm: NgForm) {
    const credential:AuthCredential=ngForm.value;
    sessionStorage.removeItem("Auth");
    this.authService.validUserDetail(credential)
      .subscribe(data=>{
      console.log(data);
      this.customerService.customer=data.body;

    },(e)=>{
      console.log(e);
    });;
  }
}
