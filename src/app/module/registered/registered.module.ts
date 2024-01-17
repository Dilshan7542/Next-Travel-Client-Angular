import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RegisteredComponent} from "./registered.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {BookedComponent} from "./components/booked/booked.component";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {CustomerService} from "../../service/customer.service";
import {bookingLoadResolver} from "../../service/resolve/routing.resolver";


@NgModule({
  declarations:[
    RegisteredComponent,
    ProfileComponent,
    BookedComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: "profile", component: ProfileComponent},
      {path: "booked", component: BookedComponent,resolve:[bookingLoadResolver]}]),
    MatButtonModule,
  ],
  exports:[RouterModule],

})
export class RegisteredModule {}
