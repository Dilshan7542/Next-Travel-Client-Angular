import {Component, OnDestroy, OnInit,} from "@angular/core";

import {ChildService} from "../child.service";
import {Hotel, HotelService} from "../../../../../service/hotel.service";
import {VehicleService} from "../../../../../service/vehicle.service";

@Component({
  selector:"hotel-component",
  templateUrl:"hotel.component.html",
  styleUrls:["hotel.component.scss"],
})
export class HotelComponent implements OnInit,OnDestroy{
    isLoading=false;


  constructor(private childService:ChildService ,private hotelService:HotelService,private test:VehicleService) {
  }

  ngOnDestroy(): void {
       this.hotelAr=[];
    }

  hotelAr:Hotel[]=[];

  ngOnInit(): void {
    this.isLoading=true;
   this.hotelService.getAllHotel().then(hotelList=>{
      this.hotelAr=hotelList;
     this.isLoading=false;
   });
// setTimeout(this.ngTest.bind(this),1000);


  }


  onSelect(hotel:Hotel,input: HTMLInputElement, parent: HTMLElement) {
      this.childService.onSelect(input,parent);
      this.hotelService.selectHotelValue=hotel;

  }
}
