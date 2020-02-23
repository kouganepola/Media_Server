import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from 'app/models/user';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private user :User;
  private isLogged$ = new BehaviorSubject(false);
  private url = `${environment.apiBaseUrl}`;
 
  constructor(private http: HttpClient) {
    
  }

  public get isLoggedIn(): boolean {
    return this.isLogged$.value;
  }

  public login(user): Observable<any> {

    console.log(user)
    return this.http.post(`${this.url}/auth/login`,user).pipe(
        map((res: { user: any }) => {
          this.user = new User(res.user);
                    
          localStorage.setItem('username',res.user.username);
          localStorage.setItem('email',res.user.email);
          localStorage.setItem('id',res.user._id);
          localStorage.setItem('root',res.user.rootFolder);
          
        
          this.isLogged$.next(true);
          return this.user;
        }));

  }

  public logout() {
  
        localStorage.clear();
        this.user = null;
        this.isLogged$.next(false);
        return of(false);

  }

  public signup(data) {
    return this.http.post(`${this.url}/auth/signup`, data)
      .pipe(
        map((res: { user: any, token: string }) => {
          this.user = new User(res.user);
          localStorage.setItem('username', res.user.username);
          localStorage.setItem('email',res.user.email);
          localStorage.setItem('root',res.user.rootFolder);
          localStorage.setItem('id',res.user._id);
          this.isLogged$.next(true);
          return this.user;
        }));
  }

 
  public get userData(): Observable<any> {
    //TODO: send current user or load data from backend using token
    return this.loadUser();
  }

  private loadUser(): Observable<any> {
    // TODO:use request to load user data with token
    if (localStorage.getItem('username') && localStorage.getItem('email')) {
      this.user = new User({
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        _id:localStorage.getItem('id'),
        rootFolder:localStorage.getItem('root')

      });
    }
   
    return of(this.user);
  }
}
