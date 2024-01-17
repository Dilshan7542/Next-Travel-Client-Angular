import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {BookingService} from "../booking.service";
import {AuthService} from "../auth/auth.service";
import {Customer, CustomerService} from "../customer.service";
import {Subscription} from "rxjs";


export const  pendingBookingGuard:CanActivateFn=(route, state) => {
  const bookingService= inject(BookingService);
  let authService = inject(AuthService);
  if (authService.authCredential) {
      authService.navigateUrl=state.url;
    if (state.url!=="/home/booking") {
     const r= inject(Router);
         const customer= sessionStorage.getItem("userDetail");
         if(customer){
           const customerObj:Customer=JSON.parse(customer);
    if(bookingService.bookingList.length<=0){

 const sub:Subscription= bookingService.searchBookingList(customerObj.customerID!).subscribe(data=>{
        bookingService.bookingList=data;
        bookingService.checkPendingBooking();
        bookingService.isPendingBookingUpdate.next();
      if(bookingService.pendingBooking){
        r.navigate(['/home/booking']);
      }
      sub.unsubscribe();
      });

    }
           if(bookingService.pendingBooking){
             r.navigate(['/home/booking']);
           }
         }
  }
  }
  return true;
}



