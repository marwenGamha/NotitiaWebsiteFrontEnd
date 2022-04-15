import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  constructor(private http: HttpClient) {}

  getcontact() {
    return this.http.get(environment.apiBaseUrl + "/allcontact");
  }

  deleteContact(_id: string) {
    return this.http.delete(environment.apiBaseUrl + `/deletecontact/${_id}`);
  }
}
