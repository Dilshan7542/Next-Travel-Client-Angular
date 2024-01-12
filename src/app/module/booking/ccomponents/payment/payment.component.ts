import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Vehicle, VehicleService} from "../../../../service/vehicle.service";
import {Hotel, HotelService} from "../../../../service/hotel.service";
import {SearchService} from "../../../../service/search.service";
import {TravelArea} from "../../../../service/travel-area.service";

export interface Payment {
  vehicleAmount: number;
  vehicleCount: number;
  hotelOption: number;
  hotelAmount: number;
  room: number;
  countDay?:number;
  travelArea?:TravelArea;
}

@Component({
  selector: "payment-component",
  templateUrl: "payment.component.html",
  styleUrls:["payment.component.scss"]
})
export class PaymentComponent implements OnInit, DoCheck {
  @Input() payment: Payment | null = null;
  selectHotel: Hotel | null = null;
  selectVehicle: Vehicle | null = null;
  minDate = new Date();
  totalAmount = 0;
  travelPrice = 0;
  guidePrice = 0;
  vehicleCharge=0;

  constructor(private vehicleService: VehicleService, private hotelService: HotelService, private searchService: SearchService) {
  }


  ngDoCheck(): void {
    this.totalAmount=this.payment?.hotelAmount!+this.payment?.vehicleAmount!;
    }


  ngOnInit(): void {
    this.selectHotel=this.hotelService.selectHotel;
    this.selectVehicle=this.vehicleService.selectVehicle;
    this.vehicleCharge=this.vehicleService.vehiclePayment.vehicleCharge!;

  }



}

