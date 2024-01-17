import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {Subscription} from "rxjs";
import {BookingService} from "../../service/booking.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy,DoCheck{
  isUserLogin=false;
  isPendingBooking=false;
  authSubscription!:Subscription;
  constructor(
    private authService:AuthService,
    private router:Router,
    private customerService:CustomerService,
    private bookingService:BookingService,
  ) {
  }

  ngDoCheck(): void {
    if (this.bookingService.pendingBooking) {
      this.isPendingBooking=true;
    }else{
      this.isPendingBooking=false;
    }
    }

  logOut(){
    this.isUserLogin=false;
    this.customerService.customer=null;
    this.bookingService.clear();
    window.location.replace("http://localhost:4200/home");
    this.authService.logOut();
  }
  authNavigate() {
    this.authService.navigateUrl=this.router.url;
    console.log(this.router.url);
  }
  ngOnInit(): void {
  this.authSubscription =this.authService.isLoginUser
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
    this.authSubscription.unsubscribe();
  }

}
