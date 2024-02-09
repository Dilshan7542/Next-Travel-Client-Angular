import {Injectable} from "@angular/core";
import {Option} from "../module/search/component/section-3/section-3.component";
import {Observable, Observer, Subject} from "rxjs";
import {TravelArea} from "./travel-area.service";
  export interface SearchSubject{
    option:Option,travelArea:TravelArea,selectDate:{ start: string|null, end: string|null }
  }
@Injectable({providedIn:"root"})
export class SearchService{
  serviceDetailSub=new Subject<SearchSubject>();
  searchSubject:SearchSubject | null=null;
  /*  {
    option:{child:0,adult:1,room:1},
    selectDate:{start:new Date().toDateString(),end:new Date().toDateString()},
    travelArea:{travelAreaID:0,areaName:"",fullKM:0}
  };*/
  isSearch=false;

  constructor() {
  let data= sessionStorage.getItem("searchSubject");
    if(data){
    const searchSub:SearchSubject=JSON.parse(data);
    this.setSelectData(searchSub);
    }
    this.isSearch=false;
  }
  setSelectData(data:SearchSubject){
    this.searchSubject=data;
    this.serviceDetailSub.next(data);
    this.isSearch=true;
  }

}
