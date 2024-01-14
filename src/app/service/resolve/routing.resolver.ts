import {ResolveFn} from "@angular/router";
import {TravelCategory, TravelService} from "../travel.service";
import {inject} from "@angular/core";
import {retry, take, tap} from "rxjs";
import {TravelArea, TravelAreaService} from "../travel-area.service";
import {Hotel, HotelService} from "../hotel.service";
import {VehicleService} from "../vehicle.service";

export const travelCategoryResolver:ResolveFn<TravelCategory[] | null>=()=>{
  const travelService= inject(TravelService);
  if (travelService.travelCategoryList.length === 0) {
     travelService.getTravelCategoryData().subscribe();
  }
  return null;

}
export const travelAreaResolver:ResolveFn<TravelArea[] | null> =()=>{
    const travelAreaService=inject(TravelAreaService);
    if(travelAreaService.travelAreaList.length===0){
      travelAreaService.getAllTravelArea().subscribe();
    }
      return null;
}

export const hotelAndVehicleResolver:ResolveFn<Hotel[] | null>=()=>{
    const hotelService= inject(HotelService);
    const vehicleService = inject(VehicleService);
    const travelService = inject(TravelService);
  if (hotelService.hotelList.length === 0) {
    hotelService.getAllHotel().subscribe();
  }
  if(vehicleService.vehicleList.length ===0){
    vehicleService.getAllVehicle()
      .subscribe();
  }
    return null;
}
