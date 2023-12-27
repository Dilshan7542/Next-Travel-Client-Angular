import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CarouselComponent} from "./component/carousel/carousel.component";
import {CategoryComponent} from "./component/category/category.component";
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "./home-routing.module";
import {SearchBarComponent} from "./component/search-bar/search-bar.component";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    CategoryComponent,
    SearchBarComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatFormFieldModule,

    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [CommonModule],

})
export class HomeModule {

}
