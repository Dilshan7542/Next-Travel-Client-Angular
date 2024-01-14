import {AfterViewChecked, Component, DoCheck, OnDestroy, OnInit} from "@angular/core";
import {Vehicle, VehicleService} from "../../service/vehicle.service";
import {Hotel, HotelService} from "../../service/hotel.service";
import {Subscription} from "rxjs";
import {SearchService, SearchSubject} from "../../service/search.service";
import {Booking, BookingService} from "../../service/booking.service";
import {CustomerService} from "../../service/customer.service";
import {Travel, TravelService} from "../../service/travel.service";
import {Router} from "@angular/router";
import {Summery, SummeryService} from "./service/summery.service";


@Component({
  selector:"booking-component",
  templateUrl:"booking.component.html",
  styleUrls:["booking.component.scss"]
})
export class BookingComponent implements OnInit,OnDestroy,AfterViewChecked{
  subscriptionBooking!:Subscription;
 selectVehicle!:Vehicle;
 selectHotel!:Hotel;
  summery!:Summery;
 searchSubject!:SearchSubject;
    vehicleCount=1;
    constructor(
        private vehicleService:VehicleService,
        private hotelService:HotelService,
        private bookingService:BookingService,
        private customerService:CustomerService,
        private travelService:TravelService,
        private summeryService:SummeryService,
        private searchService:SearchService,
        private router:Router,
    ) {
    }

    ngAfterViewChecked(): void {
       this.vehicleCount=this.summery.vehicleSum.count;
    }



 bookingBtn:{name:string,status:boolean}={name:"booking",status:false};

  ngOnInit(): void {
    window.scrollTo({top:400});
    this.subscriptionBooking=this.bookingService.isPendingBookingUpdate.subscribe(()=>{
        this.initPendingBooking();
    });
    this.summery=this.summeryService.summery;
    this.selectHotel=this.hotelService.selectHotel;
    this.selectVehicle=this.vehicleService.selectVehicle;
    this.summeryService.summerySub.next(this.summery);
    this.searchSubject=this.summeryService.searchSub;
    this.initPendingBooking();
  }

  ngOnDestroy(): void {
    this.subscriptionBooking.unsubscribe();
  }

  onChange(value: number) {
   this.summeryService.summery.hotelSum.option=value;
    this.summeryService.updateSummery();
  }
  onAddBooking() {
    let ar = new Date().toJSON().split("T");
    let toDay:{day:string,time:string}={day:ar[0],time:ar[1].substring(0,5)}
    let travel:Travel={
      startDate:this.searchSubject.selectDate.start!,
      endDate:this.searchSubject.selectDate.end!,
      travelArea:this.searchSubject.travelArea,
      adult:this.searchSubject.option.adult,
      children:this.searchSubject.option.child,
      room:this.searchSubject.option.room,
      vehicleCount:this.summery.vehicleSum.count,
      travelCategory:this.travelService.selectTravelCategory,
      vehicleCost:this.vehicleService.vehicleTotal(this.searchSubject).vehicleCharge

    }
    this.travelService.saveTravel(travel).subscribe(travel=>{
      let hotel=`{"hotelID":${this.selectHotel.hotelID},"name":"${this.selectHotel.name}","option":${this.summeryService.summery.hotelSum.option}}`;
      let vehicle=Object.assign({},this.selectVehicle);
      vehicle.image="";
    let booking:Booking={
      hotel:hotel,
      vehicle:JSON.stringify(vehicle),
      guide:"Danapala",
      travel:JSON.stringify(travel),
      date:toDay.day,
      time:toDay.time,
      paymentStatus:false,
      paidValue:0,
      customer:this.customerService.getCustomer()!,
    };
    this.bookingService.saveBooking(booking).subscribe(booking=>{
      this.bookingService.pendingBooking=booking;
        this.initPendingBooking();
        this.router.navigate(["/home/booking"])
    });
    },error => {
      console.error(error);
    });
  }


  private initPendingBooking(travel?:Travel) {
    if (this.bookingService.pendingBooking) {
          this.bookingBtn.name="Booked";
          this.bookingBtn.status=true;
          let booked=this.bookingService.pendingBooking;
            let travelPromise = this.travelService.searchTravel(JSON.parse(booked.travel).travelID);
            travelPromise.subscribe(travel=>{
      this.summery.vehicleSum.count=travel.vehicleCount;
      this.summery.vehicleSum.cost=travel.vehicleCost!;
      this.summery.vehicleSum.amount=travel.vehicleCost! * travel.vehicleCount;
      this.summery.hotelSum.room=travel.room;
      this.summery.hotelSum.option=JSON.parse(booked.hotel).option;
      this.summeryService.setCountDate({start:travel.startDate,end:travel.endDate});
      this.summery.hotelSum.amount=this.summery.hotelSum.option * travel.room * this.summery.countDay;
      this.summeryService.setTotalAmount();
      this.summeryService.summerySub.next(this.summery);

            },(error)=>{
                throw new Error(error);
            });


    }else{
      this.bookingBtn.name="Booking";
      this.bookingBtn.status=false;
    }
  }
}
