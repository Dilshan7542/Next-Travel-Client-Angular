import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../service/customer.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy{
  isUserLogin=false;
  constructor(private authService:AuthService,private router:Router,private customerService:CustomerService) {
  }

  logOut(){
    this.isUserLogin=false;
    this.authService.logOut();
  }
  authNavigate() {
    this.authService.navigateUrl=this.router.url;
  }
  ngOnInit(): void {
    this.authService.isLoginUser
      .subscribe(auth=>{
      if(auth){
      this.isUserLogin=true;
      }
    },()=>{},()=>{
        this.isUserLogin=false;
        this.customerService.customer=null;
      });
  }

  ngOnDestroy(): void {
    console.log("header Destroyed!!!");
  }
}
