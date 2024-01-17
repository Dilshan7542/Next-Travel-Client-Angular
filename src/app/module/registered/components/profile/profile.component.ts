import {Component, OnInit} from "@angular/core";
import {Customer, CustomerService} from "../../../../service/customer.service";

@Component({
  selector:"profile-component",
  templateUrl:"profile.component.html",
  styleUrls:["profile.component.scss"]
})
export class ProfileComponent implements OnInit{
    customer:Customer | null=null;
  constructor(private customerService:CustomerService) {
  }

  ngOnInit(): void {
   this.customer=this.customerService.customer;
  }
}
