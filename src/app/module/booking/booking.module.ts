import {NgModule} from "@angular/core";
import {BookingComponent} from "./booking.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BookingGuard} from "./guard/booking.guard";

@NgModule({
  declarations:[
    BookingComponent
  ],
  imports:[
    CommonModule,
    RouterModule.forChild([{path:"", component:BookingComponent,canActivate:[BookingGuard]}])
  ],
  exports:[CommonModule,BookingComponent]
})
export class BookingModule{}
