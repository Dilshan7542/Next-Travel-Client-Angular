import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, NgForm, NgModel, Validators} from "@angular/forms";
import {Customer, CustomerService} from "../../../../service/customer.service";



@Component({
  selector:"auth-sign",
  templateUrl:"sign.component.html",
  styles:[`
 form>div{
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  mat-form-field{
    width: 45%;

  }

  `]
})
export class SignComponent implements OnInit{
isPwdConform=true;
  formSignGroup!:FormGroup;
  constructor(private customerService:CustomerService) {

  }

  ngOnInit(): void {
    this.formSignGroup=new FormGroup<any>({
      nic:new FormControl("",Validators.required),
      name:new FormControl("",Validators.required),
      address:new FormControl("",Validators.required),
      email:new FormControl("",Validators.required),
      passwordData:new FormGroup({
        pwd:new FormControl("",Validators.required),
        pwd2:new FormControl(null),
      },{validators:this.isConformPassword}),
      tel:new FormControl("",Validators.required),
      comment:new FormControl("")
    });
    }



  onSubmit() {
   this.isPwdConform=this.formSignGroup.valid;
 /*   console.log(this.formSignGroup);
    console.log(this.formSignGroup.value);*/
    let customer:Customer=this.formSignGroup.value;
    const pwdData= this.formSignGroup.get("passwordData");
    if(pwdData){
    customer.pwd=pwdData.get("pwd")?.value;
    }
    this.customerService.registerCustomer(customer).subscribe(data=>{
      console.log(data);
    });
  }
  isConformPassword(formGroup:AbstractControl):{ notMatch: boolean } | null  {

    if(formGroup.get("pwd")?.value===formGroup.get("pwd2")?.value){
    return null;
    }
    return  { notMatch: true};
  }


}
