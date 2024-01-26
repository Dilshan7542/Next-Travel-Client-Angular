import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Option} from "./component/section-3/section-3.component";
import {SearchService, SearchSubject} from "../../service/search.service";
import {Subscription, map, tap} from "rxjs";
import {TravelArea} from "../../service/travel-area.service";

@Component({
  selector:"search-component",
  templateUrl:"search.component.html",
  styles:[`
  .search-bar-section{
    box-shadow:0 0 5px rgba(0, 0, 0, 0.22);
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
    height: 70px;
  }
  .search-bar-section > section,section-1,section-2,section-3{
    height: 100%;
    display: flex;
    font-weight: bold;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    border-right: rgba(0, 0, 0, 0.03) solid 1px;
  }
  .search-bar-section>:last-child{
    flex-grow: 0;
    width:10%;
    background-color: #0e55d2;
    color: #ffffff;
    font-weight: bold;
  }
  `]
})
export class SearchComponent implements OnInit,OnDestroy{
  error:string|null=null;
  subscription!:Subscription;
  selectLocation:TravelArea|null=null;
  category="";
  option:Option={room:0,child:0,adult:0};
  selectDate:{ start: string|null, end: string|null }={start:null,end:null};
  constructor(private router:Router,private activeRoute:ActivatedRoute,private searchService:SearchService) {
  }



  ngOnInit(): void {

   this.subscription= this.activeRoute.params.subscribe(param=>{
      this.category=param['category'];
    });

    }

  onSearch() {
    if(!this.selectLocation || this.selectLocation?.areaName==="Location"){
      this.error="Please Select Location!!"
    }else{
      if(!this.selectDate.start){
        this.error="Please Select Start Date";
      }else{
        if(!this.selectDate.end){
          this.error="Please Select End Date";
        }else{
    this.router.navigate(["/home/search/"+this.category+"/search/"+this.selectLocation.areaName],{relativeTo:this.activeRoute});
        }
      }
    }
  }


  onSelectLocation(event: TravelArea) {
   this.selectLocation=event;
   this.notify();
  }

  onSelectDate(event: { start: string|null, end: string|null }) {
    this.selectDate=event;
    this.notify();
  }

  onSelectOption(event: Option) {
   this.option=event;
   this.notify();

  }
  notify(){
    const searchData:SearchSubject={option:this.option,travelArea:this.selectLocation!,selectDate:this.selectDate};
    sessionStorage.setItem('searchSubject',JSON.stringify(searchData));
   this.searchService.setSelectData(searchData);

  }
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
  errorHandler(){
    this.error=null;
  }

}
