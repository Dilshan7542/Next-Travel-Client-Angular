import {Component, OnDestroy, OnInit} from "@angular/core";
import {Vehicle, VehicleService} from "../../service/vehicle.service";
import {Hotel, HotelService} from "../../service/hotel.service";
import {Subscription} from "rxjs";
import {SearchService, SearchSubject} from "../../service/search.service";
import {Payment} from "./ccomponents/payment/payment.component";
import {Booking, BookingService} from "../../service/booking.service";
import {CustomerService} from "../../service/customer.service";
import {Travel} from "../../service/travel.service";


@Component({
  selector:"booking-component",
  templateUrl:"booking.component.html",
  styleUrls:["booking.component.scss"]
})
export class BookingComponent implements OnInit,OnDestroy{
  subscription!:Subscription;
 selectVehicle!:Vehicle;
 selectHotel!:Hotel;
 payment:Payment={vehicleAmount:0,vehicleCount:1,hotelOption:0,hotelAmount:0,room:1,countDay:1};
 searchSubject!:SearchSubject;
 vehicleCount=1;
 bookingBtn:{name:string,status:boolean}={name:"booking",status:false};
  constructor(
              private vehicleService:VehicleService,
              private hotelService:HotelService,
              private searchService:SearchService,
              private bookingService:BookingService,
              private customerService:CustomerService
              ) {
  }

  ngOnInit(): void {
    console.log("booking init");
  this.subscription=this.searchService.serviceDetailSub.subscribe(data=>{
     this.searchSubject=data;
     this.countDate(data.selectDate);
     this.getVehicleCount();
     this.payment.vehicleAmount=this.vehicleService.vehicleTotal();
     this.updateHotelAmount(data.option.room,this.payment.hotelOption);
    });

    this.allDataInit();
    this.initPendingBooking();

  }
  private allDataInit() {
    this.searchSubject=this.searchService.searchSubject;
    this.selectVehicle=this.vehicleService.selectVehicleValue;
    this.selectHotel=this.hotelService.selectHotelValue;
    this.payment.room=this.searchSubject.option.room;
    this.countDate(this.searchSubject.selectDate);
    this.getVehicleCount();
    this.payment.vehicleAmount=this.vehicleService.vehicleTotal();
  }

  ngOnDestroy(): void {
    console.log("booking destroy!!");
    this.subscription.unsubscribe();
  }

  onChange(value: number) {
   this.payment.hotelOption=value;
   this.updateHotelAmount(this.searchSubject.option.room,value);
  }
  updateHotelAmount(room:number,hotelOption:number){
    this.hotelService.roomCount=room;
    this.hotelService.selectHotelOption=hotelOption;
    this.payment.room=room;
   this.payment.hotelAmount=this.hotelService.hotelTotal();
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
    this.vehicleService.vehicleCount=this.vehicleCount;
    this.payment.vehicleCount=this.vehicleCount;
  }

  private countDate(selectDate:{ start: string|null, end: string|null }) {
    if(selectDate.start && selectDate.end){
     let timeCount=new Date(selectDate.end).getTime()-new Date(selectDate.start).getTime();
        this.payment.countDay=Math.round(timeCount / (1000*3600*24));
    }


  }

  onAddBooking() {
    let ar = new Date().toJSON().split("T");
    let toDay:{day:string,time:string}={day:ar[0],time:ar[1].substring(0,5)}
    let travel:Travel={
      startDate:this.searchSubject.selectDate.start!,
      endDate:this.searchSubject.selectDate.end!,
      location:this.searchSubject.location,
      adult:this.searchSubject.option.adult,
      children:this.searchSubject.option.child,
      room:this.searchSubject.option.room,
      travelCategory:{travelCategoryID:1}

    }
    let booking:Booking={
      hotel:JSON.stringify(this.selectHotel),
      vehicle:JSON.stringify(this.selectVehicle),
      guide:"Danapala",
      travel:JSON.stringify(travel),
      date:toDay.day,
      time:toDay.time,
      paymentStatus:false,
      paidValue:0,
      customer:this.customerService.getCustomer()!,
    };
    this.bookingService.bookingList.push(booking);
   // this.bookingService.bookingList.push()
  }


  private initPendingBooking() {
    if (this.bookingService.pendingBooking) {
          this.bookingBtn.name="Booked";
          this.bookingBtn.status=true;
      console.log(this.bookingService.pendingBooking.paymentStatus);
    }else{
      this.bookingBtn.name="Booking";
      this.bookingBtn.status=false;
    }
  }
}
