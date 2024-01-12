import {Injectable} from "@angular/core";
import {TravelArea} from "./travel-area.service";


export interface TravelCategory{
  travelCategoryID:number;
  categoryName?:string;
}
export interface Travel{
  travelID?:number;
  travelArea:TravelArea;
  startDate:string;
  endDate:string;
  adult:number;
  children:number;
  room:number;
  vehicleCount:number;
  travelCategory:TravelCategory;
  vehicleCost?:number;
}
@Injectable({
  providedIn:"root"
})
export class TravelService{
  travelCategoryList:TravelCategory[]=[];
  travelList:Travel[]=[];

searchTravel(travelID:number){
  return new Promise<Travel>((resolve, reject)=>{
  for (let t of this.travelList) {
        if(t.travelID===travelID){
          resolve(t);
          break;
        }
  }
  reject(null);
  });
}
saveTravel(travel:Travel){
  return new Promise<Travel>((resolve, reject)=>{
  this.travelList.push(travel);
  resolve(travel);
  });
}
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
  public countDate(selectDate:{ start: string|null, end: string|null }) {
    if (selectDate.start && selectDate.end) {
      let timeCount = new Date(selectDate.end).getTime() - new Date(selectDate.start).getTime();
      return Math.round(timeCount / (1000 * 3600 * 24));
    }
    return 0;
  }
}
