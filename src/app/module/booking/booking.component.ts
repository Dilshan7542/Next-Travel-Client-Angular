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
  constructor(private vehicleService:VehicleService,private hotelService:HotelService,private searchService:SearchService) {
  }

  ngOnInit(): void {
    console.log("booking init..!!")
    this.searchSubject=this.searchService.searchSubject;
  this.subscription=this.searchService.serviceDetailSub.subscribe(data=>{
     this.searchSubject=data;
    });
   this.selectVehicle=this.vehicleService.selectVehicleValue;
    let img="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/a1/9c/80/essentia-luxury-hotel.jpg?w=700&h=-1&s=1";
   this.selectHotel={name:"Dilshan",image:img,email:"dilshan@gmail.com",location:"Gampaha",tel:"0752277759",starRate:"45",
   option:{option1:1000,option2:1500, option3:5000,option4:5500}
   }
 //  this.selectHotel=this.hotelService.selectHotelValue;
  }

  ngOnDestroy(): void {
    console.log("booking destroy!!");
    this.subscription.unsubscribe();
  }

}
