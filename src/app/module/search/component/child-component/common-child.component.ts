import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HotelService} from "../../../../service/hotel.service";
import {VehicleService} from "../../../../service/vehicle.service";
import {Subscription} from "rxjs";
import {SearchService, SearchSubject} from "../../../../service/search.service";

@Component({
  selector:"common-child-component",
  template:`
    <alert-component *ngIf="error" [message]="error" [header]="'Not Select Error'" (onClose)="errorHandler()"></alert-component>
    <hotel-component></hotel-component>
    <vehicle-component></vehicle-component>
    <section class="w-full pt-20 flex justify-center"><button mat-raised-button color="primary" (click)="onBooking()">Booking</button></section>
  `,
})
export class CommonChildComponent implements OnInit,OnDestroy{
  error:string|null=null;
  location='location';
  subscription!:Subscription;

  constructor(
    private activeRoute:ActivatedRoute,
    private router:Router,
    private hotelService:HotelService,
    private vehicleService:VehicleService,
    private searchService:SearchService
  ) {
  }

  ngOnInit(): void {

    if (!this.searchService.isSearch) {
        this.router.navigate(['../../'],{relativeTo:this.activeRoute});
    }
   this.subscription= this.activeRoute.params.subscribe(param=>{
        this.location=param["location"];
    });
    }

  onBooking() {
    if (!this.hotelService.selectHotel) {
      this.error="Please Select Hotel..!!"
    }else{
      if(!this.vehicleService.selectVehicle){
      this.error="Please Select Vehicle..!!"
      }else{
          if(this.searchService.searchSubject){

    this.router.navigate(["../../booking"],{relativeTo:this.activeRoute});
          }else{
            this.error="Please Select Number of Room and Adult";
          }
      }
    }
  }
  errorHandler(){
    this.error=null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
