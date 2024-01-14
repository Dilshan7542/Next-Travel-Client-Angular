import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Booking, BookingService} from "../booking.service";
import {Observable, take} from "rxjs";



@Injectable({
  providedIn:"root"
})
export class BookingResolverService implements Resolve<Booking[] | null>{

  constructor(private bookingService:BookingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Booking[]> | Promise<Booking[]> | Booking[] |null {
    if(this.bookingService.bookingList.length ===0){
      this.bookingService.getBookedList().subscribe();
    }
    if(this.bookingService.pendingBooking){
    this.bookingService.isPendingBookingUpdate.next();

    }
    return null;
  }

}
