import {Injectable} from "@angular/core";
import {TravelArea} from "./travel-area.service";
import {HttpClient} from "@angular/common/http";
import {map, Subject} from "rxjs";
import {environment} from "../../environments/environment.development";




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
  travelCategory?:TravelCategory;
  vehicleCost?:number;
}
@Injectable({
  providedIn:"root"
})
export class TravelService{
  travelCategoryList:TravelCategory[]=[];
  selectTravelCategory!:TravelCategory;
  travelList:Travel[]=[];
  path=environment.url+"/travel/api/v1/travel";
  constructor(private http:HttpClient) {
  }


  travelCategoryData=new Subject<TravelCategory[]>();
  searchTravelInMemory(travelID:number){
  return new Promise<Travel>((resolve, reject)=>{
  for (let t of this.travelList) {
        if(t.travelID===travelID){
          resolve(t);
          break;
        }
  }
  reject("Error..Travel Empty");
  });
}
searchTravel(travelID:number){
    return  this.http.get<Travel>(this.path+"/search/"+travelID).pipe(map(data=>{
        if(data){
            return data;
        }else{
            throw new Error("Travel Not Saved!!!");
        }
    }));
}
  saveTravel(travel:Travel){
   return  this.http.post<Travel>(this.path+"/register",travel).pipe(map(data=>{
          if(data){
            return data;
          }else{
          throw new Error("Travel Not Saved!!!");
          }
    }));

}
  getTravelCategoryData(){
      return this.http.get<TravelCategory[]>(this.path+"/category").pipe(map(data=>{
        this.travelCategoryList=data;
       this.travelCategoryData.next(data);
        return data;
      }));
  }

  public countDate(selectDate:{ start: string|null, end: string|null }) {
    if (selectDate.start && selectDate.end) {
      let timeCount = new Date(selectDate.end).getTime() - new Date(selectDate.start).getTime();
      return Math.round(timeCount / (1000 * 3600 * 24));
    }
    return 0;
  }
}
