import {Component, OnInit} from "@angular/core";
import {Booking, BookingService} from "../../../../service/booking.service";

@Component({
  selector:"booked-component",
  templateUrl:"booked.component.html",
  styleUrls:["booked.component.scss"]
})
export class BookedComponent implements OnInit{
  bookedList:Booking[]=[];
  error:string|null=null;
  onCancelBooking:Booking| null=null;

  constructor(private bookingService:BookingService) {

  }

  ngOnInit(): void {
    this.bookingService.getBookedList().then(bookingList=>{
      this.bookedList=bookingList;
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
      this.bookedList=this.bookedList.filter(booking=> booking!== this.onCancelBooking);
  }
}
