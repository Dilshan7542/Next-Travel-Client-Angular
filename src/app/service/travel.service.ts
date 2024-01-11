import {Injectable} from "@angular/core";


export interface TravelCategory{
  travelCategoryID:number;
  categoryName?:string;
}
export interface Travel{
  travelID?:number;
  location:string;
  startDate:string;
  endDate:string;
  adult:number;
  children:number;
  room:number;
  travelCategory:TravelCategory;
}
@Injectable({
  providedIn:"root"
})
export class TravelService{
  travelCategoryList:TravelCategory[]=[];


  constructor() {
    this.travelCategoryList.push({travelCategoryID:1,categoryName:"Regular"});
    this.travelCategoryList.push({travelCategoryID:2,categoryName:"Medium"});
    this.travelCategoryList.push({travelCategoryID:3,categoryName:"Luxury"});
    this.travelCategoryList.push({travelCategoryID:4,categoryName:"Super-Luxury"});
  }
  getTravelCategoryList(){
    return new Promise<TravelCategory[]>((resolve, reject)=>{
      resolve(this.travelCategoryList);
    });
  }
}
