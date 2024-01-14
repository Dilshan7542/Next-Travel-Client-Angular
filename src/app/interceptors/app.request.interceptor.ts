import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export class AppRequestInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth= sessionStorage.getItem("Auth");
   if(auth){
    let httpHeaders = new HttpHeaders({
      Authorization:auth,
      "X-Requested-With":"XMLHttpRequest"
    });
    let httpRequest = req.clone({headers:httpHeaders});
    return next.handle(httpRequest);

   }
   return next.handle(req);
  }

}
