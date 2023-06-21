import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../payload/user';
import { Observable } from 'rxjs';
import { EditProfile } from '../payload/EditProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // 'http://localhost:8080'
  host = environment.apiUrl;

  // number of users per page(default = 5)
  pageSize = environment.pageSize;

  constructor(private http: HttpClient) { }

  // get users by pageNumber and based on the search criteria
  searchUsers(pageNumber: number, searchTerm: string, role: string, status: string): Observable<User[]> {

    return this.http.get<User[]>(
      `${this.host}/user-search?pageNumber=${pageNumber}&pageSize=${this.pageSize}&searchTerm=${searchTerm}&role=${role}&status=${status}`
    )
  }

  // calculate total of users for count total pages
  getTotalOfUsers(searchTerm: string, role: string, status: string): Observable<number> {

    // ex: http://localhost:8080/total-of-users?searchTerm=""&role=""&status=""
    return this.http.get<number>(
      `${this.host}/total-of-users?searchTerm=${searchTerm}&role=${role}&status=${status}`
    );

  }

  // create new user(customer signs up account)
  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user-create`, user);
  }

  // update user profile
  public updateProfile(editProfile: EditProfile): Observable<User> {
    return this.http.put<User>(`${this.host}/edit-profile`, editProfile);
  }

  // find user by user id
  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.host}/user-list/${id}`);
  }

}
