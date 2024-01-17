import {TravelArea} from "../../../service/travel-area.service";
import {Vehicle, VehicleService} from "../../../service/vehicle.service";
import {HotelService} from "../../../service/hotel.service";
import {Injectable} from "@angular/core";
import {TravelService} from "../../../service/travel.service";
import {SearchService, SearchSubject} from "../../../service/search.service";
import {Subject} from "rxjs";
import {BookingService} from "../../../service/booking.service";

export interface Summery {
  vehicleSum:VehicleSum;
  hotelSum:HotelSum;
  countDay:number;
  totalSum: number;
  travelArea?:TravelArea;
}
export interface VehicleSum{
    fee1Day:number,
    fee1KM:number,
    fuel1KM:number,
    cost:number,
    count:number,
    amount: number
}
export interface HotelSum{
    option: number;
    room: number;
    cost:number;
    amount: number;
}
interface SelectDate{
  start:string |null,end:string | null
}
interface Option{
adult:number,child:number,room:number
}
@Injectable()
export class SummeryService{
    selectVehicle:VehicleService | null=null;
   selectHotel:HotelService | null=null;
    searchSub!:SearchSubject;
    summerySub=new Subject<Summery>();
    summery:Summery ={
      countDay:1,
      hotelSum:{option:0,room:1,cost:0,amount:0},
      vehicleSum:{fee1Day:0,fee1KM:0,fuel1KM:0,cost:0,amount:0,count:1},
      totalSum:0,
    };

  constructor(
    private vehicleService:VehicleService,
    private searchService:SearchService,
    private bookingService:BookingService

  ) {
    this.initializer();
  }
  initializer(){
   this.searchService.serviceDetailSub.subscribe(data=>{
      this.searchSub=data;
      this.setVehicleCount(data.option);
      this.setCountDate(data.selectDate);
      this.setVehicleAmount();
      this.summery.travelArea=data.travelArea;
      this.summery.hotelSum.room=data.option.room;
      this.setHotelAmount(data.option.room,this.summery.hotelSum.option,this.summery.countDay);
      this.setTotalAmount();  // final Amount
       this.summerySub.next(this.summery);
    });
   if(this.searchService.searchSubject){
   this.updateSummery();
   }
  }
  updateSummery(){
    this.searchSub=this.searchService.searchSubject;
    this.setVehicleCount(this.searchSub.option);
    this.setCountDate(this.searchSub.selectDate);
    this.setVehicleAmount();
    this.summery.travelArea=this.searchSub.travelArea;
    this.setHotelAmount(this.searchSub.option.room,this.summery.hotelSum.option,this.summery.countDay);
      this.setTotalAmount(); // final Amount
      this.summerySub.next(this.summery);
  }

  setHotelAmount(room:number,hotelOption:number,dayCount:number){
      this.summery.hotelSum.cost=room * hotelOption;
      this.summery.hotelSum.amount=this.summery.hotelSum.cost * dayCount;
  }
  setVehicleCount(option:Option){
    this.summery.vehicleSum.count=this.sumVehicleCount((option.adult+option.child),this.vehicleService.selectVehicle.seat);
  }
  setCountDate(selectDate:SelectDate){
    this.summery.countDay=this.getCountDate(selectDate);
  }


  private getCountDate(selectDate:{start:string |null,end:string | null}){
    if (selectDate.start && selectDate.end) {
      let timeCount = new Date(selectDate.end).getTime() - new Date(selectDate.start).getTime();
      return Math.round(timeCount / (1000 * 3600 * 24));
    }
    return 0;
  }
 private sumVehicleCount(headCount:number,seat:number) {
    let countValue=1;
    if((headCount)> seat){
      let count=1;
      while(headCount!==0 && headCount>seat){
        headCount -=seat;
        count++;
      }
      countValue=count;
    }
    return countValue;
  }
  setVehicleAmount(){
    this.vehicleTotal(this.vehicleService.selectVehicle);
  }
private vehicleTotal(vehicle:Vehicle){
    this.summery.vehicleSum.fee1Day=vehicle.fee1Day *this.summery.countDay!;
    this.summery.vehicleSum.fee1KM=vehicle.fee1KM * this.searchSub.travelArea.fullKM;
    this.summery.vehicleSum.fuel1KM=vehicle.fuel1KM * this.searchSub.travelArea.fullKM;
    this.summery.vehicleSum.cost=this.summery.vehicleSum.fuel1KM +this.summery.vehicleSum.fee1KM+this.summery.vehicleSum.fee1Day;
    this.summery.vehicleSum.amount=this.summery.vehicleSum.cost*this.summery.vehicleSum.count;
  }
  setTotalAmount(){
    this.summery.totalSum=this.summery.vehicleSum.amount+this.summery.hotelSum.amount;
  }

}
