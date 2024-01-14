import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {TravelCategory, TravelService} from "../../../../service/travel.service";
import {VehicleService} from "../../../../service/vehicle.service";

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
      background-color: white;

    }
    h2{
      margin: 0;
    }

  `]
})
export class CategoryComponent implements OnInit{
    travelCategoryList:TravelCategory[]=[];
  constructor(private router:Router,private activeRoute:ActivatedRoute,private travelService:TravelService) {
  }
  ngOnInit(): void {
  this.travelCategoryList=this.travelService.travelCategoryList;
    this.travelService.travelCategoryData.subscribe(data=>{
      this.travelCategoryList=data;
    })
  }



  onSelect(category: TravelCategory) {
    this.travelService.selectTravelCategory=category;
    this.router.navigate(['search',category.travelCategoryID],{relativeTo:this.activeRoute});
  }


}
