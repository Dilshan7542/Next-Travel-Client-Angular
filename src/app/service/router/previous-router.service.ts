import {Injectable} from "@angular/core";
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";

@Injectable({
  providedIn:"root"
})
export class PreviousRouteService {

  private previousUrl!: string;
  private currentUrl: string;
  private currentNavigation!: string;
  private previousNavigation!: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    /*router.events.subscribe(event => {


      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
      if(event instanceof NavigationStart){
        console.log(event);
        this.previousNavigation=this.currentNavigation;
       this.currentNavigation=event.url;
      }
    });*/
  }
  public getPreviousNavigation(){
    return this.previousNavigation;
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
