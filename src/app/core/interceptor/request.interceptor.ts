import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HandleHttpErrorsService } from '../handleHttpErrors/handle-http-errors.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private httpError : HandleHttpErrorsService) {}

  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    const token: any = localStorage.getItem('token');

    const modified = req.clone({
      setHeaders: {
        // Authorization,
        'token': token ? token : 'no token',
        'Accept': '*',
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'http://10.199.8.185:9988/',
      },
      withCredentials: true
    });

    return next.handle(modified).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) { 
        }
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        this.httpError.handleError(err)
        return throwError(err);
      })
    )
    
  }
}
