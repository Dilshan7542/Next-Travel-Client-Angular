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
  searchSubject!:SearchSubject;
  isSearch=false;

  constructor() {
    console.log("search init");
  let data= sessionStorage.getItem("searchSubject");
    if(data){
    const searchSub:SearchSubject=JSON.parse(data);
    this.setSelectData(searchSub);
    }
    this.isSearch=false;
  }
  setSelectData(data:SearchSubject){
    this.searchSubject=data;
    this.serviceDetailSub.next({option:data.option,travelArea:data.travelArea,selectDate:data.selectDate});
    this.isSearch=true;
  }

}
