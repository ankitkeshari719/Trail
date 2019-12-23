import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppconfigService {

  constructor(private http: HttpClient) { }

  getConfiguration() {
      return this.http.get(document.getElementsByTagName('base')[0].href + '../config/app.config.json').toPromise();
  }
}
