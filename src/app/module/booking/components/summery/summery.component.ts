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
    summery:Summery ={
        countDay:1,
        hotelSum:{option:0,room:1,cost:0,amount:0},
        vehicleSum:{fee1Day:0,fee1KM:0,fuel1KM:0,cost:0,amount:0,count:1},
        totalSum:0,
    };

  selectVehicle!:Vehicle;
  constructor(
      private summeryService:SummeryService,
      private vehicleService: VehicleService,

  ) {
  }
  ngOnInit(): void {
    this.summery=this.summeryService.summery;
    this.summeryService.summerySub.subscribe(data=>{
        this.summery=data;
    });

    this.selectVehicle=this.vehicleService.selectVehicle;
  }




}
