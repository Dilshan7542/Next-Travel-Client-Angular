import {ResolveFn, Router} from "@angular/router";
import {TravelCategory, TravelService} from "../travel.service";
import {inject} from "@angular/core";
import {retry, take, tap} from "rxjs";
import {TravelArea, TravelAreaService} from "../travel-area.service";
import {Hotel, HotelService} from "../hotel.service";
import {VehicleService} from "../vehicle.service";
import {Customer, CustomerService} from "../customer.service";
import {Booking, BookingService} from "../booking.service";
import {AuthService} from "../auth/auth.service";
import {state} from "@angular/animations";



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
  if (hotelService.hotelList.length === 0) {
    hotelService.getAllHotel().subscribe();
  }
  if(vehicleService.vehicleList.length ===0){
    vehicleService.getAllVehicle()
      .subscribe();
  }
    return null;
}

export const bookingLoadResolver:ResolveFn<Booking | null>=()=>{
      const bookingService = inject(BookingService);
  if (bookingService.bookingList.length === 0) {
    bookingService.getBookedList().subscribe(data=>{
        bookingService.bookingList=data;
        bookingService.checkPendingBooking();
    });
  }
  return null;
}
export const bookingUserResolver:ResolveFn<Booking | null>=()=>{
  const bookingService = inject(BookingService);

  if (sessionStorage.getItem("userDetail")) {
  if (bookingService.bookingList.length === 0) {
    bookingService.getBookedList().subscribe(data=>{
      bookingService.bookingList=data;
      bookingService.checkPendingBooking();
    });
  }
  }
  return null;
}
