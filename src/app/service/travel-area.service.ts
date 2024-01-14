import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Subject, tap} from "rxjs";

export interface TravelArea{
  travelAreaID:number;
  areaName:string;
  fullKM:number
}
@Injectable({
  providedIn:"root"
})
export class TravelAreaService{
  travelAreaList:TravelArea[]=[];
  travelAreaData=new Subject<TravelArea[]>();
  constructor(private http:HttpClient) {
  }
  getAllTravelArea(){
    return this.http.get<TravelArea[]>(environment.url+"/travel/api/v1/travel/area/all").pipe(tap(data=>{
      this.travelAreaList=data;
      this.travelAreaData.next(data);
    }));
  }
}
