import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RegisteredComponent} from "./registered.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {BookedComponent} from "./components/booked/booked.component";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";


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
      {path: "booked", component: BookedComponent}]),
    MatButtonModule,
  ],
  exports:[RouterModule]
})
export class RegisteredModule {}
