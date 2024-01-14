import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {AuthService} from "./auth/auth.service";
import {Subject, tap} from "rxjs";
export interface Customer{
   customerID?:number,
  nic:string;
  name:string;
  address:string;
  email:string;
  pwd:string;
  tel:string;
  image:string;
}

@Injectable({
  providedIn:"root"
})
export class CustomerService{
  customer:Customer |null=null;
  customerData=new Subject<Customer>();
  path=environment.url+"/customer/api/v1/customer";
  constructor(private http:HttpClient,private authService:AuthService) {
  }

  getCustomerDetail(email:string){
    return this.http.get<Customer>(this.path+"/search/email/"+email).pipe(tap(data=>{
      this.customer=data;
      this.customerData.next(data);
    }));
  }
  registerCustomer(customer:Customer){
    console.log(customer);
     return  this.http.post<Customer>(this.path+"/register",customer);
  }
getCustomer(){
  return this.customer;
    }
}
