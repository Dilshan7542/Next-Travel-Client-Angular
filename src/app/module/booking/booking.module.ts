import {NgModule} from "@angular/core";
import {BookingComponent} from "./booking.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BookingGuard} from "./guard/booking.guard";
import {PaymentComponent} from "./ccomponents/payment/payment.component";
import {MatSortModule} from "@angular/material/sort";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AuthGuard} from "../../service/guard/auth.guard";


@NgModule({
  declarations:[
    BookingComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: "", component: BookingComponent, canActivate: [BookingGuard]}]),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,

  ],
  exports:[CommonModule],

})
export class BookingModule{}
