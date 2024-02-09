import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit,} from "@angular/core";

import {ChildService} from "../child.service";
import {Hotel, HotelService} from "../../../../../service/hotel.service";
import {VehicleService} from "../../../../../service/vehicle.service";

@Component({
  selector:"hotel-component",
  templateUrl:"hotel.component.html",
  styleUrls:["hotel.component.scss"],
})
export class HotelComponent implements OnInit,OnDestroy,AfterViewInit{
    isLoading=false;


  constructor(private childService:ChildService ,private hotelService:HotelService,private test:VehicleService) {
  }

  ngAfterViewInit(): void {
    window.scrollTo({top:500});
    }



  ngOnDestroy(): void {
       this.hotelAr=[];
    }

  hotelAr:Hotel[]=[];

  ngOnInit(): void {
    this.hotelAr=this.hotelService.copyHotelList;
    if(this.hotelAr.length===0){
    this.isLoading=true;
    }
   this.hotelService.hotelDataList.subscribe(data=>{
      this.hotelAr=data;
     this.isLoading=false;
   });


  }


  onSelect(hotel:Hotel,input: HTMLInputElement, parent: HTMLElement) {
      this.childService.onSelect(input,parent);
      this.hotelService.selectHotel=hotel;
      sessionStorage.setItem("selectHotel",JSON.stringify(hotel));

  }
}
