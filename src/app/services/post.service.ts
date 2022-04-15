import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "app/model/post.model";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class PostService {
  public posts: Array<Post> = [];

  constructor(private http: HttpClient) {}

  getposts() {
    return this.http.get(environment.apiBaseUrl + "/allposts");
  }

  postValue(post: Post) {
    return this.http.post(environment.apiBaseUrl + "/newpost", post);
  }

  deletePost(_id: string) {
    return this.http.delete(environment.apiBaseUrl + `/deletepost/${_id}`);
  }

  putPost(temp: Post) {
    return this.http.put(
      environment.apiBaseUrl + `/updatepost/${temp._id}`,
      temp
    );
  }
}
