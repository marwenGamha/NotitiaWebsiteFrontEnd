import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Role } from "app/model/role.model";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  role: Role;

  constructor(private http: HttpClient) {}

  getrole() {
    return this.http.get(environment.apiBaseUrl + "/allrole");
  }

  putRole(dashboard, user, valeur, team, contact, client, services) {
    let postData: Role;

    postData = {
      dashboard: dashboard,
      user: user,
      valeur: valeur,
      team: team,
      contact: contact,
      client: client,
      services: services,
    };

    return this.http.put(environment.apiBaseUrl + `/putrole`, postData);
  }
}
