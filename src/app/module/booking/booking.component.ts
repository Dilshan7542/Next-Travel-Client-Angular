import {Component, OnDestroy, OnInit} from "@angular/core";
import {Vehicle, VehicleService} from "../../service/vehicle.service";
import {Hotel, HotelService} from "../../service/hotel.service";
import {Subscription} from "rxjs";
import {SearchService, SearchSubject} from "../../service/search.service";
import {Payment} from "./ccomponents/payment/payment.component";
import {Booking, BookingService} from "../../service/booking.service";
import {CustomerService} from "../../service/customer.service";
import {Travel, TravelService} from "../../service/travel.service";
import {Router} from "@angular/router";

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
              private customerService:CustomerService,
              private travelService:TravelService,
              private router:Router,
              ) {
  }

  ngOnInit(): void {
  this.subscription=this.searchService.serviceDetailSub.subscribe(data=>{
     this.searchSubject=data;
    this.payment.countDay=this.travelService.countDate(this.searchSubject.selectDate);
     this.vehicleCount=this.vehicleService.getVehicleCount(data);
     this.payment.vehicleCount=this.vehicleCount;
    this.payment.vehicleAmount=this.vehicleService.vehicleTotal(data).VehicleTotalAmount!;
    this.payment.travelArea=data.travelArea;
     this.updateHotelAmount(data.option.room,this.payment.hotelOption,this.payment.countDay);
    });

    this.allDataInit();
    this.initPendingBooking();

  }
  private allDataInit() {
    this.searchSubject=this.searchService.searchSubject;
    this.selectVehicle=this.vehicleService.selectVehicle;
    this.selectHotel=this.hotelService.selectHotel;
    this.payment.room=this.searchSubject.option.room;
    this.vehicleCount=this.vehicleService.getVehicleCount(this.searchSubject);
    this.payment.vehicleCount=this.vehicleCount;
    this.payment.vehicleCount=this.vehicleService.getVehicleCount(this.searchSubject);
    this.payment.vehicleAmount=this.vehicleService.vehicleTotal(this.searchSubject).VehicleTotalAmount!;
    this.payment.travelArea=this.searchSubject.travelArea;
    this.payment.countDay=this.travelService.countDate(this.searchSubject.selectDate);
    this.updateHotelAmount(this.searchSubject.option.room,this.payment.hotelOption,this.payment.countDay);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onChange(value: number) {
   this.payment.hotelOption=value;
   this.updateHotelAmount(this.searchSubject.option.room,value,this.payment.countDay!);
  }
  updateHotelAmount(room:number,hotelOption:number,countDay:number){
    this.payment.room=room;
   this.payment.hotelAmount=this.hotelService.getHotelAmount(room,hotelOption,countDay);
  }
  onAddBooking() {
    let ar = new Date().toJSON().split("T");
    let toDay:{day:string,time:string}={day:ar[0],time:ar[1].substring(0,5)}
    let travel:Travel={
      travelID:1,
      startDate:this.searchSubject.selectDate.start!,
      endDate:this.searchSubject.selectDate.end!,
      travelArea:this.searchSubject.travelArea,
      adult:this.searchSubject.option.adult,
      children:this.searchSubject.option.child,
      room:this.searchSubject.option.room,
      vehicleCount:this.vehicleCount,
      travelCategory:{travelCategoryID:1},
      vehicleCost:this.vehicleService.vehicleTotal(this.searchSubject).vehicleCharge

    }
    this.travelService.saveTravel(travel).then(travel=>{
      let hotel=this.selectHotel;
      let vehicle=this.selectVehicle;
    let booking:Booking={
      hotel:JSON.stringify(hotel),
      vehicle:JSON.stringify(vehicle),
      guide:"Danapala",
      travel:JSON.stringify(travel),
      date:toDay.day,
      time:toDay.time,
      paymentStatus:false,
      paidValue:0,
      customer:this.customerService.getCustomer()!,
    };
    this.bookingService.saveBooking(booking).then(booking=>{
      this.bookingService.pendingBooking=booking;
        this.initPendingBooking();
        this.router.navigate(["/home/booking"])
    });
    });
  }


  private initPendingBooking() {
    if (this.bookingService.pendingBooking) {
          this.bookingBtn.name="Booked";
          this.bookingBtn.status=true;
          let booked=this.bookingService.pendingBooking;
            let travelPromise = this.travelService.searchTravel(JSON.parse(booked.travel).travelID);
            travelPromise.then(travel=>{
          this.payment.room=travel.room;
      this.payment.vehicleCount=travel.vehicleCount;
      this.payment.hotelOption=JSON.parse(booked.hotel).option;
      this.payment.hotelAmount=this.payment.hotelOption * travel.room;
      this.payment.vehicleAmount=travel.vehicleCost! * travel.vehicleCount;
            });


    }else{
      this.bookingBtn.name="Booking";
      this.bookingBtn.status=false;
    }
  }
}
