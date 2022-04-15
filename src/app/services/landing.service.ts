import { Contact } from "./../model/contact.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class LandingService {
  constructor(private http: HttpClient) {}

  postContact(
    fullName: string,
    email: string,
    number: string,
    subject: string,
    message: string
  ) {
    let postData: Contact;
    postData = {
      fullName: fullName,
      email: email,
      number: number,
      subject: subject,
      message: message,
    };

    // postData.append("fullname", fullname);
    // postData.append("email", email);
    // postData.append("number", number);
    // postData.append("subject", subject);
    // postData.append("message", message);

    return this.http.post(environment.apiBaseUrl + "/contact", postData);
  }
}
