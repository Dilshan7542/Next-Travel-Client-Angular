import {NgModule} from "@angular/core";
import {BookingComponent} from "./booking.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BookingGuard} from "../../service/guard/booking.guard";
import {PaymentComponent} from "./components/payment/payment.component";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../shared/shared.module";
import {BookingResolverService} from "../../service/resolve/booking-resolver.service";
import {SummeryComponent} from "./components/summery/summery.component";
import {SummeryService} from "./service/summery.service";



@NgModule({
  declarations:[
    BookingComponent,
    PaymentComponent,
    SummeryComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{path: "", component: BookingComponent, canActivate: [BookingGuard],resolve:[BookingResolverService]}]),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,

  ],
  exports:[CommonModule],
providers:[SummeryService]
})
export class BookingModule{}
