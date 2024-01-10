import {Injectable} from "@angular/core";
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
  getCustomer(){
    return this.customer;
  }
}
