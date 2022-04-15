import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  roleAs: string;
  UserDeatails: User = {
    _id: "",

    fullName: "",
    email: "",
    password: "",
    creation_dt: "",
    role: "",
  };

  selectedUser: User = {
    _id: "",

    fullName: "",
    email: "",
    password: "",
    creation_dt: "",
    role: "",
  };
  users: User[];

  // readonly baseURL = "http://localhost:3000/api";

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.user = this.userSubject.asObservable();
  }

  public getuserValue(): String {
    return this.userSubject.value.role;
  }

  //HttpMethods

  getUsers() {
    return this.http.get(environment.apiBaseUrl + "/all");
  }

  postUser(user: User) {
    return this.http.post(
      environment.apiBaseUrl + "/register",
      user,
      this.noAuthHeader
    );
  }

  login(authCredentials) {
    return this.http.post(
      environment.apiBaseUrl + "/authenticate",
      authCredentials,
      this.noAuthHeader
    );
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + "/userProfile");
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  deleteToken() {
    localStorage.removeItem("token");
  }
  deleterole() {
    localStorage.removeItem("role");
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }

  isAdmin(): boolean {
    this.roleAs = localStorage.getItem("role");

    this.getUserProfile().subscribe((res) => {
      this.UserDeatails = res["user"];
    });

    if (this.UserDeatails.role === "superAdmin") {
      return true;
    }
    return false;
    //   this.roleAs = localStorage.getItem("role");

    //   if (this.roleAs === "admin") {
    //     return false;
    //   }
    //   return true;
    // }
  }

  putUser(temp: User) {
    return this.http.put(environment.apiBaseUrl + `/put/${temp._id}`, temp);
  }

  deleteUser(_id: string) {
    return this.http.delete(environment.apiBaseUrl + `/delete/${_id}`);
  }

  forgetPassword(email) {
    return this.http.post(environment.apiBaseUrl + "/forgetPassword", email);
  }

  forgetPass(email: String) {
    return this.http.post(
      environment.apiBaseUrl + `/forgetPass/${email}`,
      email
    );

    // return this.http.post(environment.apiBaseUrl +  /forgetPass/${email} );
  }

  resetPassword(password, token: string) {
    return this.http.patch(
      environment.apiBaseUrl + `/resetPassword/${token}`,
      password
    );
  }
  updatePassword(passwordCredentials) {
    return this.http.patch(
      environment.apiBaseUrl + `/updatePassword`,
      passwordCredentials
    );
  }
}
