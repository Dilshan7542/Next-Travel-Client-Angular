import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthCredential, AuthService} from "src/app/service/auth/auth.service";
import {Customer, CustomerService} from "../../../../service/customer.service";


@Component({
  selector:"auth-login",
  templateUrl:"login.component.html"
})
export class LoginComponent{
error:string |null=null;
  constructor(private authService:AuthService,private customerService:CustomerService) {
  }

  onSubmit(ngForm: NgForm) {
    const credential:AuthCredential=ngForm.value;
    this.authService.validUserDetail(credential)
      .subscribe(data=>{
      this.customerService.customer=data.body;
      sessionStorage.setItem("userDetail",JSON.stringify(data.body));
    },(e)=>{
      console.log(e);
      this.error=e;
    });;
  }

  errorHandler() {
    this.error=null;
  }
}
