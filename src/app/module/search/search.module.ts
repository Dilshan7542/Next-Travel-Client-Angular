import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SearchComponent} from "./search.component";
import {Section1Component} from "./component/section-1/section-1.component";
import {Section2Component} from "./component/section-2/section-2.component";
import {Section3Component} from "./component/section-3/section-3.component";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {SearchRoutingModule} from "./search-routing.module";
import {HotelComponent} from "./component/child-component/hotel/hotel.component";
import {VehicleComponent} from "./component/child-component/vehicle/vehicle.component";
import {CommonChildComponent} from "./component/child-component/common-child.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChildService} from "./component/child-component/child.service";
import {MatButtonModule} from "@angular/material/button";
import {BookingModule} from "../booking/booking.module";
import {SearchService} from "../../service/search.service";
import {SharedModule} from "../shared/shared.module";
import {VehicleCalcService} from "../../service/calculation/vehicle-calc.service";



@NgModule({
  declarations:[
    SearchComponent,
    Section1Component,
    Section2Component,
    Section3Component,
    CommonChildComponent,
    HotelComponent,
    VehicleComponent
  ],
  imports: [
    SharedModule,
    SearchRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    BookingModule
  ],
  providers:[ChildService,VehicleCalcService]
})
export class SearchModule{}
