import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Hotel, HotelService} from "../hotel.service";
import {Observable} from "rxjs";
import {VehicleService} from "../vehicle.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class SearchResolverService implements Resolve<Hotel[]>{

  constructor(private hotelService:HotelService,private vehicleService:VehicleService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Hotel[]> | Promise<Hotel[]> | Hotel[] {

    if (this.hotelService.hotelList.length === 0) {
      return this.hotelService.initValue();
    }
      // @ts-ignore
    return null;

  }

}
