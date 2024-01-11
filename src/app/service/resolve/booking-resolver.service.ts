import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Booking, BookingService} from "../booking.service";
import {Observable} from "rxjs";



@Injectable({
  providedIn:"root"
})
export class BookingResolverService implements Resolve<Booking[] | null>{

  constructor(private bookingService:BookingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Booking[]> | Promise<Booking[]> | Booking[] |null {
    this.bookingService.checkPendingBooking();
    return  null;
  }

}
