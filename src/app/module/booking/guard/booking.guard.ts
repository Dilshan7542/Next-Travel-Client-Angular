import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChildFn,
  CanActivateFn,
  RouterStateSnapshot, UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {VehicleService} from "../../../service/vehicle.service";
import {HotelService} from "../../../service/hotel.service";
import {SearchService} from "../../../service/search.service";


@Injectable({providedIn:"root"})
export class BookingGuard implements CanActivate{

  constructor(private vehicleService:VehicleService,private hotelService:HotelService,private searchService:SearchService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          if(this.vehicleService.selectVehicleValue){
             if(this.hotelService.selectHotelValue){
               if(this.searchService.searchSubject){
                 return true;
               }
             }
          }else{
          console.error("Please Select Vehicle");
          }
    return true;
  }

}

