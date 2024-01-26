import {AfterViewChecked, Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
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
  @ViewChild("f") hotelSelectRef!:ElementRef<HTMLSelectElement>;
  subscriptionBooking!:Subscription;
 selectVehicle!:Vehicle;
 selectHotel!:Hotel;
 errors:{header:string,message:string}| null=null;
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
        private router:Router,
    ) {
    }

    ngAfterViewChecked(): void {
      setTimeout(()=>{
      this.vehicleCount=this.summery.vehicleSum.count;
      },0);
    }



 bookingBtn:{name:string,status:boolean}={name:"booking",status:false};

  ngOnInit(): void {
        if(this.summeryService.subscription){
          if(this.summeryService.subscription.closed){
            console.log("is close");
          this.summeryService.initializer();
          }
        }

      if (this.bookingService.pendingBooking) {
          this.summery=this.summeryService.summery;
          this.initPendingBooking();
      }else{
        this.initializer();
      }

  }
  initializer(){
      window.scrollTo({top:400});
      this.subscriptionBooking=this.bookingService.isPendingBookingUpdate.subscribe((data)=>{
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
    if(this.subscriptionBooking){
    this.subscriptionBooking.unsubscribe();
    }
    if(this.summeryService.subscription){
      this.summeryService.subscription.unsubscribe();
    }
  }

  onChange(value: number) {
   this.summeryService.summery.hotelSum.option=value;
    this.summeryService.updateSummery();
  }
  onAddBooking() {

      if (this.summery.hotelSum.option<=0) {
          this.errors={header:"Not Select Error..!!",message:"Please Select Hotel Option"};
       this.hotelSelectRef.nativeElement.style.border="red solid 1px";
          return;
      }
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
      this.selectHotel.selectOption=this.summery.hotelSum.option;
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
    this.bookingService.saveBooking(booking).subscribe(booking=>{
      this.bookingService.pendingBooking=booking;
        this.initPendingBooking();
        this.router.navigate(["/home/booking"]);
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
         this.travelService.searchTravel(JSON.parse(booked.travel).travelID).subscribe(travel=>{
             const hotel:Hotel=JSON.parse(booked.hotel);
             const vehicle:Vehicle=JSON.parse(booked.vehicle);
             this.selectVehicle=vehicle;
             this.selectHotel=hotel;
             this.vehicleService.selectVehicle=vehicle;
             this.hotelService.selectHotel=hotel;
      this.summeryService.searchSub={option:{room:travel.room,adult:travel.adult,child:travel.children},
          travelArea:travel.travelArea,selectDate:{start:travel.startDate,end:travel.endDate}}
      this.summeryService.setCountDate({start:travel.startDate,end:travel.endDate});
      this.summeryService.setHotelAmount(travel.room,hotel.selectOption!,this.summery.countDay);
      this.summeryService.setVehicleCount({room:travel.room,adult:travel.adult,child:travel.children});
      this.summeryService.setVehicleAmount();
      this.summeryService.setTotalAmount();
            },(error)=>{
                throw new Error(error);
            });


    }else{
      this.bookingBtn.name="Booking";
      this.bookingBtn.status=false;
    }
  }

    errHandler() {
        this.errors=null;
    }
}
