import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import StorageHelper from '../helpers/storage.helper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private apiService: ApiService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('/mirror/')) {
      console.log(StorageHelper.getItem('session'));
      let originalRequest = request;
      request = request.clone({
        setHeaders : {
          Authorization : 'Bearer '+StorageHelper.getItem('session').token
        }
      })
      return next.handle(request).pipe(
        catchError(
          (err : any) => {
            console.log('In error ',err);
            if(err instanceof HttpErrorResponse && err.status === 401){
              console.log('In error1 ');
              return this.expiredHandler( originalRequest, next )
            }
            return throwError(() => err);
          }
        )
      )
    }
    return next.handle(request);
  }

  private expiredHandler( originalRequest : HttpRequest<unknown>, next : HttpHandler ){
    return this.apiService.refreshToken().pipe(
      switchMap((resp) => {
        StorageHelper.setItem('session', resp);
        originalRequest = originalRequest.clone({
          setHeaders : {
            Authorization : 'Bearer '+StorageHelper.getItem('session').token
          }
        })
        return next.handle(originalRequest);
      })
    )
  }
}
