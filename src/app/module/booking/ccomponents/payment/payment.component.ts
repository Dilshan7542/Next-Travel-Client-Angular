import {Component, Input, OnInit} from "@angular/core";
import {Vehicle, VehicleService} from "../../../../service/vehicle.service";
import {Hotel, HotelService} from "../../../../service/hotel.service";
import {SearchService} from "../../../../service/search.service";

export interface Payment{

}
@Component({
  selector:"payment-component",
  templateUrl:"payment.component.html",
  styles:[`

    th, td {
      text-align: start;
      padding: 5px;
    }

    input {
      outline: 0;
      width: 80%;
      border-radius: 2px;
      box-shadow: 0 0 5px rgba(0, 0, 255, 0.34);
      padding: 2px;

    }

    #payment-section>section{
      display: flex;
      padding: 10px;
      width: 80%;
    }
    .boxShadow-custom {
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.10);
    }
  `]
})
 export class PaymentComponent implements OnInit{
  @Input() hotelOption=0;
  selectHotel:Hotel | null=null;
  selectVehicle:Vehicle | null=null;

  constructor(private vehicleService:VehicleService,private hotelService:HotelService,private searchService:SearchService) {
  }

  ngOnInit(): void {
    this.selectHotel=this.hotelService.selectHotelValue;
    this.selectVehicle=this.vehicleService.selectVehicleValue;
  }




}

