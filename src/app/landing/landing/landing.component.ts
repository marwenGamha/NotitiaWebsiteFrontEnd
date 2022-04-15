import { LandingService } from "./../../services/landing.service";
import { PostService } from "./../../services/post.service";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Post } from "app/model/post.model";
import { TeamService } from "app/services/team.service";
import { Team } from "app/model/team.model";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { SerService } from "app/services/ser.service";
import { Ser } from "app/model/ser.model.";
import { Client } from "app/model/client.model";
import { ClientService } from "app/services/client.service";

declare var $: any;

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
})
export class LandingComponent implements OnInit {
  formm: FormGroup;
  submitted = false;

  teams: Team[];
  clients: Client[];

  constructor(
    private fb: FormBuilder,
    public postService: PostService,
    public teamService: TeamService,
    public landingService: LandingService,
    public serService: SerService,
    public clientService: ClientService
  ) {}

  ngOnInit() {
    this.formm = this.fb.group({
      fullname: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      number: new FormControl(null, {
        validators: [Validators.required],
      }),
      subject: new FormControl(null, {
        validators: [Validators.required],
      }),
      message: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
    this.refreshpostList();
    this.refreshTeamList();
    this.refreshSerList();
    this.refreshClientList();
  }

  get contactFormControl() {
    return this.formm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.formm.valid) {
      this.landingService
        .postContact(
          this.formm.value.fullname,
          this.formm.value.email,
          this.formm.value.number,
          this.formm.value.subject,
          this.formm.value.message
        )
        .subscribe(
          (res) => {
            this.showSwal("success");
            this.formm.reset();
          },
          (err) => {
            this.showSwal("error");
          }
        );
    }
  }

  showSwal(type) {
    if (type == "success") {
      Swal.fire({
        title: "Good job!",
        text: "contact form submit with sucess!",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        type: "success",
      });
    } else if (type == "error") {
      Swal.fire({
        title: "error",
        text: "ops! some thing goes wrong",
        type: "error",
        confirmButtonClass: "btn btn-info",
        buttonsStyling: false,
      });
    }
  }

  // ngAfterViewInit() {
  //   this.refreshpostList();
  // }
  refreshpostList() {
    this.postService.getposts().subscribe((res) => {
      this.postService.posts = res as Post[];
    });
  }

  refreshSerList() {
    this.serService.getser().subscribe((res) => {
      this.serService.serr = res as Ser[];
    });
  }

  refreshTeamList() {
    this.teamService.getteams().subscribe((res) => {
      this.teams = res as Team[];
    });
  }

  refreshClientList() {
    this.clientService.getClient().subscribe((res) => {
      this.clients = res as Client[];
    });
  }
}
