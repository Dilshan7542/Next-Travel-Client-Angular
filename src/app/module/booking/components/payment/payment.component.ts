import {AfterViewChecked, Component, DoCheck} from "@angular/core";
import {SummeryService} from "../../service/summery.service";



@Component({
  selector: "payment-component",
  templateUrl: "payment.component.html",
  styleUrls:["payment.component.scss"]
})
export class PaymentComponent implements DoCheck{

 totalAmount = 0;

  minDate = new Date();

  constructor(private summeryService:SummeryService) {
  }

  ngDoCheck(): void {
    this.totalAmount=this.summeryService.summery.totalSum;
    }



}

