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
        'Authorization': token ? 'Bearer ' + token : 'no token',
        // 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4OTcyNTI1LCJpYXQiOjE2OTg5NzIyMjUsImp0aSI6ImZmYjBkNmQ3OWI5MDRmNTRiOGUzOGZmZjg2YzIwNTNiIiwidXNlcl9pZCI6Mn0.9jZSZ72JCA2fbySh5kmCQlPgF8pSoKmbzxEWp_BF780',
        // 'Content-Length' : '57',
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'http://34.147.213.123',
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
