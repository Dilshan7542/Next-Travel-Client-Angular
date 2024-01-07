import {Component, OnDestroy, OnInit} from "@angular/core";
import {Vehicle, VehicleService} from "../../service/vehicle.service";
import {Hotel, HotelService} from "../../service/hotel.service";
import {Subscription} from "rxjs";
import {Option} from "../search/component/section-3/section-3.component";
import {SearchService, SearchSubject} from "../../service/search.service";
import {data} from "autoprefixer";


@Component({
  selector:"booking-component",
  templateUrl:"booking.component.html",
  styleUrls:["booking.component.scss"]
})
export class BookingComponent implements OnInit,OnDestroy{
  subscription!:Subscription;
 selectVehicle!:Vehicle;
 selectHotel!:Hotel;
 searchSubject!:SearchSubject;
 vehicleCount=1;
 hotelOption=0;
  constructor(private vehicleService:VehicleService,private hotelService:HotelService,private searchService:SearchService) {
  }

  ngOnInit(): void {
    console.log("booking init..!!")
    this.searchSubject=this.searchService.searchSubject;
  this.subscription=this.searchService.serviceDetailSub.subscribe(data=>{
     this.searchSubject=data;
     this.getVehicleCount();
    });
   this.selectVehicle=this.vehicleService.selectVehicleValue;
   this.selectHotel=this.hotelService.selectHotelValue;
    this.getVehicleCount();
  }

  ngOnDestroy(): void {
    console.log("booking destroy!!");
    this.subscription.unsubscribe();
  }

  onChange(value: number) {
    console.log("hotel opttion :" +value);
    this.hotelOption=value;
  }

  getVehicleCount() {
    let headCount=this.searchSubject.option.adult+this.searchSubject.option.child;
    let number=headCount;
    if((headCount)> this.selectVehicle.seat){
      let count=1;
      while(headCount!==0 && headCount>this.selectVehicle.seat){
        headCount -=this.selectVehicle.seat;
        count++;
      }
      this.vehicleCount=count;
    }else{
      this.vehicleCount=1;
    }
  }
}
