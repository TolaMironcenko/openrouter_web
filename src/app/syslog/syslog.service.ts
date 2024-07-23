import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SyslogService {
  httpClient = inject(HttpClient);
  baseUrl = [window.location.origin, "api/syslog"].join('/');

  getSyslog(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`, {responseType: 'text'})
      .pipe(tap((result) => {
        // console.log(result)
      }));
  }

  constructor() { }
}
