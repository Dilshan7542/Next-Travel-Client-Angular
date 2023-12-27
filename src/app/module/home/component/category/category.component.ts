import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector:"category-component",
  templateUrl:"category.component.html",
  styles:[`
    .categoryList-section>section{
      font-weight: bold;
      width: 24%;
      border: black solid 1px;
      height: 100px;
      display: flex;
      margin: 5px;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      cursor: pointer;

    }
    h2{
      margin: 0;
    }

  `]
})
export class CategoryComponent{

  constructor(private router:Router,private activeRoute:ActivatedRoute) {
  }

  categoryList:string[]=["Regular","Medium","Luxury","Super-Luxury"];

  onSelect(category: string) {
    this.router.navigate(['search',category],{relativeTo:this.activeRoute,queryParams:{test:'Dilshan'}});
  }
}
