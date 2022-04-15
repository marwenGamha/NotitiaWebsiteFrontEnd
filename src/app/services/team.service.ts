import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Team } from "app/model/team.model";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class TeamService {
  public squad: Array<Team> = [];

  constructor(private http: HttpClient) {}

  postTeam(
    fullName,
    title,
    fileToUplode: File,
    facebook,
    twitter,
    email,
    linkedin
  ) {
    const formData: FormData = new FormData();

    formData.append("imagePath", fileToUplode, fileToUplode.name);

    formData.append("fullName", fullName);

    formData.append("title", title);
    formData.append("facebook", facebook);

    formData.append("twitter", twitter);

    formData.append("email", email);

    formData.append("linkedin", linkedin);

    return this.http.post(environment.apiBaseUrl + "/createteam", formData);
  }

  // imagePath,
  // fileToUplode: File
  putTeam(
    _id,
    fullName,
    title,

    facebook,
    twitter,
    email,
    linkedin,
    fileToUpload
  ) {
    const formData: FormData = new FormData();

    let postData: Team | FormData;
    // if (typeof imagePath === "object") {
    postData = new FormData();

    postData.append("title", title);
    postData.append("imagePath", fileToUpload);

    postData.append("fullName", fullName);

    postData.append("facebook", facebook);

    postData.append("twitter", twitter);

    postData.append("email", email);

    postData.append("linkedin", linkedin);

    // postData.append('image', image, title);
    // } else {
    //   console.log("2eme");
    //   // postData = { _id, title, fullname, facebook, twitter, email, linkedin };
    // }

    return this.http.put(
      environment.apiBaseUrl + `/updateteam/${_id}`,
      postData
    );
  }

  getteams() {
    return this.http.get(environment.apiBaseUrl + "/allteams");
  }

  deleteTeam(_id: string) {
    return this.http.delete(environment.apiBaseUrl + `/deleteteam/${_id}`);
  }
}
