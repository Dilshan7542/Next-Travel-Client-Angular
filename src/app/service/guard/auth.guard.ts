import {Injectable} from "@angular/core";
import {AuthCredential, AuthService} from "../auth/auth.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {map, Observable, take, tap} from "rxjs";


@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService:AuthService,private router:Router,private activeRouter:ActivatedRoute) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userDetail = sessionStorage.getItem("userCredential");
    this.authService.navigateUrl=state.url;
    if(userDetail){
          this.authService.validUserDetail(JSON.parse(userDetail));
        }
      if(this.authService.authCredential){
        console.log("auth Ok..!!");
        return true;
      }else{
        console.log("is falkse");
      this.router.navigate(["/auth"]);
        return false;
      }
  }

}
