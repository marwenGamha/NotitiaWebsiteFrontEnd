import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Client } from "app/model/client.model";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  public clients: Array<Client> = [];

  constructor(private http: HttpClient) {}

  postClient(fullName, title, body, fileToUplode: File) {
    const formData: FormData = new FormData();

    formData.append("image", fileToUplode, fileToUplode.name);
    formData.append("fullName", fullName);
    formData.append("title", title);
    formData.append("body", body);

    return this.http.post(environment.apiBaseUrl + "/createclient", formData);
  }

  putClient(_id, fullName, title, body, fileToUpload) {
    const formData: FormData = new FormData();

    let clientData: Client | FormData;
    clientData = new FormData();
    clientData.append("title", title);
    clientData.append("image", fileToUpload);
    clientData.append("fullName", fullName);
    clientData.append("body", body);

    return this.http.put(
      environment.apiBaseUrl + `/updateclient/${_id}`,
      clientData
    );
  }

  getClient() {
    return this.http.get(environment.apiBaseUrl + "/allclient");
  }

  deleteClient(_id: string) {
    return this.http.delete(environment.apiBaseUrl + `/deleteclient/${_id}`);
  }
}
