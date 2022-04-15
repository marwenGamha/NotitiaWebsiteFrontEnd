import { NgForm } from "@angular/forms";
import { Component, OnInit, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "app/login/user.service";
import Swal from "sweetalert2";

declare var $: any;

@Component({
  selector: "app-set-password",
  templateUrl: "./set-password.component.html",
  styleUrls: ["./set-password.component.css"],
})
export class SetPasswordComponent implements OnInit {
  resetToken: null;
  focus;

  test: Date = new Date();
  private toggleButton;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  constructor(
    private element: ElementRef,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.resetToken = params.token;
    });
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  model = {
    password: "",
  };
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  checkFullPageBackgroundImage() {
    var $page = $(".full-page");
    var image_src = $page.data("image");

    if (image_src !== undefined) {
      var image_container =
        '<div class="full-page-background" style="background-image: url(' +
        image_src +
        ') "/>';
      $page.append(image_container);
    }
  }

  ngOnInit() {
    this.checkFullPageBackgroundImage();

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("lock-page");

    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $(".card").removeClass("card-hidden");
    }, 700);
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("lock-page");
  }

  onSubmit(form: NgForm) {
    this.userService.resetPassword(form.value, this.resetToken).subscribe(
      (res) => {
        this.showSwal("success-message");
        this.router.navigateByUrl("/login");
      },
      (err) => {
        this.showSwal("Cancelled-message");

        this.serverErrorMessages = err.error.message;
      }
    );
  }

  showSwal(type) {
    if (type == "Cancelled-message") {
      Swal.fire({
        title: "Error",
        text: "link has expired or something goes wrong )",
        type: "error",
        confirmButtonClass: "btn btn-danger",
        buttonsStyling: false,
      });
    } else if (type == "success-message") {
      Swal.fire({
        title: "Success !",
        text: "Password has been reset successfully",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        type: "success",
      });
    }
  }
}
