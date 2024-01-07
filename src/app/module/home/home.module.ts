import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CarouselComponent} from "./component/carousel/carousel.component";
import {CategoryComponent} from "./component/category/category.component";
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "./home-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SearchModule} from "../search/search.module";



@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SearchModule

  ],
  exports: [CommonModule,SearchModule],

})
export class HomeModule {

}
