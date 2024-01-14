import {Component, DoCheck, Input, OnInit} from "@angular/core";
import {Vehicle, VehicleService} from "../../../../service/vehicle.service";
import {Hotel, HotelService} from "../../../../service/hotel.service";
import {SearchService} from "../../../../service/search.service";
import {Summery, SummeryService} from "../../service/summery.service";


@Component({
  selector:"summery-component",
  templateUrl:"summery.component.html",
  styleUrls:["summery.component.scss"]

})
export class SummeryComponent implements OnInit{
 summery: Summery | null = null;
  selectHotel!:Hotel;
  selectVehicle!:Vehicle;
  constructor(
      private summeryService:SummeryService,
      private vehicleService: VehicleService,
      private hotelService: HotelService,
      private searchService: SearchService
  ) {
  }
  ngOnInit(): void {
    this.summery=this.summeryService.summery;
    this.summeryService.summerySub.subscribe(data=>{
        this.summery=data;
    });
    this.selectHotel=this.hotelService.selectHotel;
    this.selectVehicle=this.vehicleService.selectVehicle;
  }




}
