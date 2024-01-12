import {Injectable} from "@angular/core";

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
  constructor() {
    this.travelAreaList.push({travelAreaID:1,areaName:"Gampaha",fullKM:10});
    this.travelAreaList.push({travelAreaID:1,areaName:"Negombo",fullKM:30});
    this.travelAreaList.push({travelAreaID:1,areaName:"Panadura",fullKM:60});
    this.travelAreaList.push({travelAreaID:1,areaName:"Colombo",fullKM:25});
    this.travelAreaList.push({travelAreaID:1,areaName:"Galle",fullKM:120});
    this.travelAreaList.push({travelAreaID:1,areaName:"Mathara",fullKM:150});
  }
}
