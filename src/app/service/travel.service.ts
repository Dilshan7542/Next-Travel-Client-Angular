import {Injectable} from "@angular/core";
import {Travel} from "./booking.service";

export interface TravelCategory{
  travelCategoryID:number;
  categoryName?:string;
}
@Injectable({
  providedIn:"root"
})
export class TravelService{
  travelCategoryList:TravelCategory[]=[];


  constructor() {
  }
  getTravelCategoryList(){
    this.travelCategoryList.push({travelCategoryID:1,categoryName:"Regular"});
    this.travelCategoryList.push({travelCategoryID:2,categoryName:"Medium"});
    this.travelCategoryList.push({travelCategoryID:3,categoryName:"Luxury"});
    this.travelCategoryList.push({travelCategoryID:4,categoryName:"Super-Luxury"});
    return new Promise<TravelCategory[]>((resolve, reject)=>{
      resolve(this.travelCategoryList);
    });
  }
}
