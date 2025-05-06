import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {
  accessToken: any;
  clientToken: any;
  ngxPermissionService: any;
    constructor(public router: Router, 		public readonly notificationService: NotificationService,
        ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): import('rxjs').Observable<HttpEvent<any>> {
      this.clientToken = localStorage.getItem("client-token");
      this.accessToken = localStorage.getItem("token");
      if (this.clientToken) {
          req = req.clone({
              headers: req.headers.set('Access-Control-Allow-Origin', '*').set('Authorization', 'Bearer ' +
                  this.clientToken),
              responseType: 'json',
          });
      }
      if (this.accessToken) {
        console
          req = req.clone({
              headers: req.headers.set('Access-Control-Allow-Origin', '*').set('Authorization', 'Bearer ' +
                  this.accessToken),
              responseType: 'json',
          });
      }
      return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
      }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 403) {
                if(err.error.detail === 'User is Terminated'){
                  this.notificationService.showErrorNotification('', 'User is Terminated');
                  this.router.navigate(['/login']);
                  localStorage.clear();
                  this.ngxPermissionService.flushPermissions();
                }else{
                  this.notificationService.showErrorNotification('', 'User not Found');
                  this.router.navigate(['/login']);
                }
                
              } 
              // else if (err.status === 401) {
              //   this.notificationService.showWarningNotification('', 'Unauthorized');

              // }
          }
      }));
  }
}
