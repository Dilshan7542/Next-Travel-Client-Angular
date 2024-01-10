import {Injectable} from "@angular/core";
import {AuthService} from "../auth/auth.service";
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
    let auth:Observable<boolean> | null=null;
    let b=true;
    if(b){
    return true;
    }
      if(this.authService.authCredential){
      auth= this.authService.authCredential.pipe(take(1),map(auth=> auth!==null));
      }
    if (!auth) {
      this.authService.navigateUrl=state.url;
      this.router.navigate(["/auth"]);
    }
       return auth!;
  }

}
