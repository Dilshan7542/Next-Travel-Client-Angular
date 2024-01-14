import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {BookingService} from "../booking.service";


export const pendingBookingGuard:CanActivateFn=(route, state)=>{
  const bookingService= inject(BookingService);
     const r= inject(Router);
  if (state.url!=="/home/booking") {
    if(bookingService.pendingBooking){
      r.navigate(['/home/booking']);
      bookingService.isPendingBookingUpdate.next();
      return false;
    }
  }
  return true;
}



