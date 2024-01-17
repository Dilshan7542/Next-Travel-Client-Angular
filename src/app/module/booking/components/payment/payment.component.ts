import {AfterViewChecked, Component, DoCheck, OnInit} from "@angular/core";
import {SummeryService} from "../../service/summery.service";
import {BookingService} from "../../../../service/booking.service";
import {Router} from "@angular/router";




@Component({
  selector: "payment-component",
  templateUrl: "payment.component.html",
  styleUrls:["payment.component.scss"]
})
export class PaymentComponent implements OnInit,DoCheck{
isBooked=false;
 totalAmount = 0;

  minDate = new Date();

  constructor(private summeryService:SummeryService,private bookingService:BookingService,private router:Router) {
  }

  ngDoCheck(): void {
    this.totalAmount=this.summeryService.summery.totalSum;
    }

  ngOnInit(): void {
    if (this.bookingService.pendingBooking) {
          this.isBooked=true;
    }
  }


  onClick() {
    this.bookingService.makePayment()?.subscribe(data=>{
      this.router.navigate(['/home']);
      this.bookingService.getBookedList();
    });
  }
}

