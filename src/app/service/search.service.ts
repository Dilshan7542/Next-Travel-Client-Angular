import {Injectable} from "@angular/core";
import {Option} from "../module/search/component/section-3/section-3.component";
import {Observable, Observer, Subject} from "rxjs";
  export interface SearchSubject{
    option:Option,location:string,selectDate:{ start: string|null, end: string|null }
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
    this.serviceDetailSub.next({option:data.option,location:data.location,selectDate:data.selectDate});
    this.isSearch=true;
  }

}
