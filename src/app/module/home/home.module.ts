import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CarouselComponent} from "./component/carousel/carousel.component";
import {CategoryComponent} from "./component/category/category.component";
import {HomeRoutingModule} from "./home-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SearchModule} from "../search/search.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    CategoryComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SearchModule

  ],


})
export class HomeModule {

}
