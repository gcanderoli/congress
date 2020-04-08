import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CongressService {

  constructor(private httpClient: HttpClient) { }

  baseURL = 'https://api.propublica.org/congress/v1/116/senate/members.json';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': 'xs8AUsmjiiAXWhjXMrs9uIvSxXo7KIHwDk75E6iD'
    })
  };

  public getAllMembers() {
    return this.httpClient.get(this.baseURL, this.httpOptions);
  }
}
