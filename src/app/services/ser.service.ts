import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Ser } from "app/model/ser.model.";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class SerService {
  public serr: Array<Ser> = [];

  constructor(private http: HttpClient) {}

  getser() {
    return this.http.get(environment.apiBaseUrl + "/allser");
  }

  postser(post: Ser) {
    return this.http.post(environment.apiBaseUrl + "/newser", post);
  }

  deleteser(_id: string) {
    return this.http.delete(environment.apiBaseUrl + `/deleteser/${_id}`);
  }

  putser(temp: Ser) {
    return this.http.put(
      environment.apiBaseUrl + `/updateser/${temp._id}`,
      temp
    );
  }
}
