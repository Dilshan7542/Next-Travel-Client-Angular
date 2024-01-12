import {ActivatedRouteSnapshot,CanActivate,Router,RouterStateSnapshot, UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {VehicleService} from "../vehicle.service";
import {HotelService} from "../hotel.service";
import {SearchService} from "../search.service";
import {BookingService} from "../booking.service";


@Injectable({providedIn:"root"})
export class BookingGuard implements CanActivate{

  constructor(
    private vehicleService:VehicleService,
    private hotelService:HotelService,
    private bookingService:BookingService,
    private searchService:SearchService,
    private router:Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          if(sessionStorage.getItem("selectVehicle")){
             if(sessionStorage.getItem("selectHotel")){
               if(this.searchService.searchSubject){
                 return  true;
               }else{
                 console.error("search subject null");
               }
             }else{
          console.error("Please Select Hotel");
             }
          }else{
          }
    console.error("booking Faild");
        this.router.navigate(['/home']);
    return false;
  }

}

