import {AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import {Booking, BookingService} from "../../../../service/booking.service";
import {Subscription} from "rxjs";
import {Travel, TravelService} from "../../../../service/travel.service";

@Component({
  selector:"booked-component",
  templateUrl:"booked.component.html",
  styleUrls:["booked.component.scss"]
})
export class BookedComponent implements OnInit,OnDestroy{
  bookedList:Booking[]=[];
  error:string|null=null;
  onCancelBooking:Booking| null=null;
  isLoadingMode=false;
  subscription!:Subscription;
  constructor(private bookingService:BookingService,private travelService:TravelService) {

  }

  ngOnInit(): void {
    this.bookedList=this.bookingService.bookingList;
    if(this.bookedList.length===0){
    this.isLoadingMode=true;
    }
   this.subscription=this.bookingService.bookingListData.subscribe(bookingList=>{
      this.bookedList=bookingList;
      this.isLoadingMode=false;
    });
  }



  onActionAlert($event: boolean) {
    this.error=null;
    this.cancelBooking();
  }

  onCloseAlert() {
      this.error=null;
  }

  onCancel(booking: Booking) {
        this.error="Do You Want Cancel Booking ?";
        this.onCancelBooking=booking;
  }

  private cancelBooking() {

    this.bookingService.cancelPendingBooking(this.onCancelBooking?.bookingID!).subscribe(()=>{
      this.bookingService.pendingBooking=null;
      this.bookingService.getBookedList().subscribe()
      this.bookingService.isPendingBookingUpdate.next();
       const travel= this.onCancelBooking?.travel;
       if(travel){
        this.travelService.deleteTravel( JSON.parse(travel).travelID).subscribe();
       }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected readonly JSON = JSON;

}
