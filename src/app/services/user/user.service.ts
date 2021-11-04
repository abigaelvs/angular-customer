import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalStorageService } from 'ngx-webstorage';

import { User } from 'src/app/models/user';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  private apiUrl: string = "api/users";
  private httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService  
  ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, this.httpOptions)
  }

  getByUsername(username: string): Observable<User> {
    const url = `${this.apiUrl}?username=${username}`;
    return this.http.get<User>(url, this.httpOptions);
  }

  post(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  login(user: User): boolean {
    this.localStorage.store("username", user.username);
    this.localStorage.store("userRole", user.role);
    this.loggedIn.emit(true);
    return true;
  }

  logout() {
    this.localStorage.clear("username");
    this.localStorage.clear("userRole")
    this.loggedIn.emit(false)
    return true;
  }
  
  getLocalUsername() {
    return this.localStorage.retrieve("username");
  }

  isLoggedIn(): boolean {
    return this.getLocalUsername() != null && this.getLocalUsername() != undefined;
  }

  getLocalRole() {
    return this.localStorage.retrieve("userRole");
  }

  isAdmin() {
    return this.getLocalRole() == "admin";
  }

  isCoAdmin() {
    return this.getLocalRole() == "co-admin"
  }

  isUser() {
    return this.getLocalRole() == "user";
  }

  
}
