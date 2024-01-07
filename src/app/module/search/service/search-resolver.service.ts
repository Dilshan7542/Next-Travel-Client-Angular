import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Hotel, HotelService} from "../../../service/hotel.service";
import {Observable} from "rxjs";
import {VehicleService} from "../../../service/vehicle.service";


export class SearchResolverService implements Resolve<Hotel[]>{

  constructor(private hotelService:HotelService,private vehicleService:VehicleService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Hotel[]> | Promise<Hotel[]> | Hotel[] {
    // @ts-ignore
    return null;
  }

}
