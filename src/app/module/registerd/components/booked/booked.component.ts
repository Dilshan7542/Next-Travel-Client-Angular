import {AfterContentInit, AfterViewInit, Component, OnInit} from "@angular/core";
import {Booking, BookingService} from "../../../../service/booking.service";

@Component({
  selector:"booked-component",
  templateUrl:"booked.component.html",
  styleUrls:["booked.component.scss"]
})
export class BookedComponent{
  bookedList:Booking[]=[];
  error:string|null=null;
  onCancelBooking:Booking| null=null;
  isLoadingMode=false;

  constructor(private bookingService:BookingService) {

  }



  ngOnInit(): void {
    this.isLoadingMode=true;
    this.bookingService.getBookedList().then(bookingList=>{
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
    this.bookingService.bookingList=this.bookedList.filter(booking=> booking!== this.onCancelBooking);
    this.bookedList=this.bookingService.bookingList;
    this.bookingService.checkPendingBooking();
  }

  protected readonly JSON = JSON;
  protected readonly localStorage = localStorage;
}
